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
} from "@mui/material";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";
import { formatDate } from "../../utils/convertToDate";

import {
  BookmarkAddOutlined,
  TextsmsOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import Skeleton from "../../components/Skeleton/Skeleton";

const SingleArticle = () => {
  const [blogPost, setBlogPost] = useState({});
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
        setBlogPost(data.post)
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

  console.log(blogPost);

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
          justifyContent={"space-between"}
          alignItems={"center"}
          display={"flex"}
          mt={"3em"}
        >
          <Box width={"70%"}>
            <Typography variant="h2" component="h4" fontWeight={800}>
              {blogPost.title}
            </Typography>

            <Box display={"flex"} alignItems={"center"} my={"2em"}>
              <Tooltip title={`${blogPost.name}`}>
                <Avatar
                  src={blogPost?.profileImage}
                  alt={blogPost?.profileImage}
                ></Avatar>
              </Tooltip>

              <Box ml={".5em"}>
                <Typography component={"p"} variant="p">
                  {blogPost?.name}
                </Typography>
               {blogPost.bio && <Typography variant="p" component={'p'} my={'.5em'} color={"GrayText"}>{blogPost.bio}</Typography>}
                <Typography component={"p"} variant="p" color={"GrayText"}>
                  Published on
                  <Typography ml={".5em"} component={"span"} variant="span">
                    {formatDate(blogPost?.createdAt)}
                  </Typography>
                </Typography>
              </Box>
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
