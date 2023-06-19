import {
  Avatar,
  Box,
  Container,
  Divider,
  Tooltip,
  Typography,
  Button,
  Stack,
  Alert,
  Snackbar,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";

import Slider from "react-slick";

import { useParams } from "react-router-dom";

import "./article.css";

import axios from "axios";
import { formatDate } from "../../utils/convertToDate";

import {
  BookmarkAddOutlined,
  TextsmsOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import Skeleton from "../../components/Skeleton/Skeleton";

const sliderSettings = {
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 2,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  dots: false,
};

const SingleArticle = () => {
  const [blogPost, setBlogPost] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchSingleBlogPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/posts/blogs?post=${blogId}`,
          {
            withCredentials: true,
          }
        );
        setBlogPost(data.post);
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
      } catch (err) {
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
        setError(true);
      }
    };
    fetchSingleBlogPost();
  }, []);

  useEffect(() => {
    const getRestOfBlogPostsOfThisUser = async () => {
      if (blogPost) {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/v1/posts/getMoreUserPosts?postId=${blogPost._id}&userId=${blogPost.createdBy}`
          );
          setError(false);
          setFilteredPosts(data.filteredPosts);
        } catch (err) {
          setError(true);
        }
      }
    };

    getRestOfBlogPostsOfThisUser();
  }, [blogPost]);

  return (
    <Container>
      {error && (
        <Snackbar
          open={isSnackBarOpen}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">could not fetch blog</Alert>
        </Snackbar>
      )}
      {Object.keys(blogPost).length > 0 ? (
        <Stack
          direction={"column"}
          alignItems={"center"}
          display={"flex"}
          mt={"3em"}
        >
          <Box width={"70%"}>
            <Typography variant="h2" component="h4" fontWeight={800}>
              {blogPost.title}
            </Typography>

            <Box
              display={"flex"}
              alignItems={"center"}
              my={"2em"}
              position={"relative"}
            >
              <Tooltip title={`${blogPost.name}`}>
                <Avatar
                  sx={{ alignSelf: "flex-start" }}
                  src={blogPost?.profileImage}
                  alt={blogPost?.profileImage}
                ></Avatar>
              </Tooltip>

              <Box ml={".5em"}>
                <Typography component={"p"} variant="p">
                  {blogPost?.name}
                </Typography>
                {blogPost.bio && (
                  <Typography
                    variant="p"
                    component={"p"}
                    my={".5em"}
                    color={"GrayText"}
                  >
                    {blogPost.bio}
                  </Typography>
                )}
                <Typography component={"p"} variant="p" color={"GrayText"}>
                  Published on
                  <Typography ml={".5em"} component={"span"} variant="span">
                    {formatDate(blogPost?.createdAt)}
                  </Typography>
                  <Box my={"1em"}>
                    <Chip
                      variant="filled"
                      label={blogPost?.tags}
                      size="large"
                    />
                  </Box>
                </Typography>
              </Box>

              <Typography
                color={"GrayText"}
                position={"absolute"}
                bottom={"-1rem"}
                right={"0"}
                component={"p"}
                variant="p"
              >
                last updated: {formatDate(blogPost.updatedAt)}
              </Typography>
            </Box>

            <Divider />
            <Box display={"flex"} justifyContent={"space-between"} my={"1em"}>
              <Stack direction={"row"}>
                <Tooltip title={"like this blog post"}>
                  <Button
                    startIcon={<ThumbUpOutlined />}
                    variant="text"
                    color="inherit"
                  >
                    {blogPost?.likes}
                  </Button>
                </Tooltip>
                <Tooltip title={"comments"}>
                  <Button
                    startIcon={<TextsmsOutlined />}
                    variant="text"
                    color="inherit"
                  >
                    {blogPost?.comments?.length}
                  </Button>
                </Tooltip>
              </Stack>
              <Tooltip title={"save this blog post"}>
                <Button
                  startIcon={<BookmarkAddOutlined fontSize="large" />}
                  variant="text"
                  color="inherit"
                ></Button>
              </Tooltip>
            </Box>
            <Divider />

            <img
              style={{ margin: "1em 0" }}
              width={"100%"}
              src={blogPost?.image}
              alt={`blog-${blogPost?._id}`}
            />

            <Typography
              variant="p"
              lineHeight={"30px"}
              my={"1em"}
              fontWeight={400}
              component={"p"}
            >
              {blogPost?.description}
            </Typography>

            <Box bgcolor={"#FAFAFA"} p={"1em"}>
              <Box display={"flex"}>
                <Box flex={2} py={"1em"}>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={blogPost.profileImage}
                    alt={blogPost.name}
                  />
                  <Typography
                    component={"h3"}
                    variant={"p"}
                    lineHeight={"30px"}
                    fontWeight={800}
                  >
                    Written by {blogPost.name}
                  </Typography>
                  <Typography
                    component={"h3"}
                    variant={"p"}
                    lineHeight={"30px"}
                    fontWeight={400}
                    color={"GrayText"}
                  >
                    {blogPost.bio}
                  </Typography>
                </Box>

                {/* <Box flex={1}></Box> */}
              </Box>

              <Divider />

             {filteredPosts.length > 0 && <Box my={"2em"}>
                <Typography
                  py={"2em"}
                  component={"p"}
                  variant="p"
                  fontWeight={600}
                >
                  More From {blogPost.name} 👇
                </Typography>

                <Box>
                  <Slider {...sliderSettings} className="slider-styles">
                    {filteredPosts.map((post) => {
                      return (
                        <Card
                          key={post._id}
                          maxWidth={250}
                          sx={{ height: "400px" }}
                        >
                          <CardMedia
                            component="img"
                            alt={post.title}
                            height="140"
                            image={post.image}
                          />
                          <CardContent>
                            <Box display={"flex"} alignItems={"center"}>
                              <Avatar
                                src={post.profileImage}
                                alt={post.name}
                              ></Avatar>
                              <Typography
                                ml={".5em"}
                                component={"p"}
                                variant="p"
                                fontWeight={200}
                              >
                                {post.name}
                              </Typography>
                            </Box>
                            <Typography
                              maxWidth={300}
                              my={".5em"}
                              component={"h3"}
                              variant="p"
                              fontWeight={800}
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              maxWidth={400}
                              my={".5em"}
                              lineHeight={"25px"}
                              component={"p"}
                              variant="p"
                              color={"GrayText"}
                            >
                              {post.description.slice(0, 150)}...
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Slider>
                </Box>
              </Box>}

            </Box>
          </Box>
        </Stack>
      ) : (
        <Box mt={"5em"}>
          <Skeleton />
        </Box>
      )}
    </Container>
  );
};

export default SingleArticle;
