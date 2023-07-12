import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import RightDrawerProfile from "./RightDrawerProfile";
import Skeleton from "../../components/Skeleton/Skeleton";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { formatDate } from "../../utils/convertToDate";

import GIF from "../../Assets/disperse.gif"

const Profile = () => {
  const [currentUserblogs, setCurrentUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState(userId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUserPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/posts/user/posts?user=${currentUserId}`,
          {
            withCredentials: true,
          }
        );
        setCurrentUserBlogs(data?.posts);
        setIsLoading(false);
      } catch (err) {
        alert(err?.response?.data?.msg || "failed to retrieve user posts 😣");
        setIsLoading(false);
      }
    };

    fetchCurrentUserPosts();
  }, [currentUserId]);

  const handleClickOnBlog = (blogId) => {
    navigate(`/content/blog/${blogId}`);
  };

  const handleClickOnUser = (newUserId) => {
    setCurrentUserId(newUserId);
  };

  return (
    <>
      <Box display={"flex"}>
        {currentUserblogs.length > 0 ? (
          <Box flex={{xs:1,md:5}}>
            {!isLoading ? (
              <Box>
                {currentUserblogs.length > 0 &&
                  currentUserblogs.map((blog) => {
                    return (
                      <Container
                        key={blog._id}
                        onClick={() => handleClickOnBlog(blog._id)}
                      >
                        <Stack
                          direction={"column"}
                          py={"2em"}
                          px={".5em"}
                          pb={"1em"}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: { xs: "1em", sm: "0em" },
                            }}
                          >
                            <Avatar src={blog.profileImage} alt={blog.name} />
                            <Typography
                              ml={{ xs: ".5em", sm: "1em" }}
                              component={"h3"}
                              variant="p"
                              fontWeight={600}
                            >
                              {blog.name}
                            </Typography>
                          </Box>

                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent={"space-between"}
                            alignItems={{ xs: "start", sm: "center" }}
                            display={"flex"}
                          >
                            <Box flex={5} order={{ xs: 2, sm: 1 }}>
                              <Typography
                                component={"h2"}
                                my={{ xs: "1em", sm: ".5em" }}
                                variant="p"
                                fontWeight={800}
                              >
                                {blog.title}
                              </Typography>
                              <Typography
                                mr={".5em"}
                                className="fade-description fade-description-lines"
                                component={"p"}
                              >
                                {blog.description}
                              </Typography>

                              <Stack
                                my={"1em"}
                                direction={"row"}
                                alignItems={"center"}
                                display={"flex"}
                                justifyContent={"space-between"}
                              >
                                <Chip
                                  variant="filled"
                                  label={blog.tags}
                                  size="large"
                                />
                                <Box
                                  alignSelf={"flex-end"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                >
                                  <Typography
                                    display={{ xs: "none", sm: "block" }}
                                    color={"GrayText"}
                                    fontSize={"15px"}
                                  >
                                    {formatDate(blog.createdAt)}
                                  </Typography>

                                  <Tooltip
                                    title={"save"}
                                    sx={{ ml: "1em", mr: "1em" }}
                                  >
                                    <IconButton>
                                      <BookmarkAddOutlined />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Stack>
                            </Box>

                            <Box flex={2} order={{ xs: 1, sm: 2 }}>
                              <img
                              width={'100%'}
                                className="blog-image"
                                style={{ objectFit: "cover" }}
                                src={blog.image}
                                alt={blog.title}
                              />
                            </Box>
                          </Stack>

                          <Divider />
                        </Stack>
                      </Container>
                    );
                  })}
              </Box>
            ) : (
              <Skeleton />
            )}
          </Box>
        ) : (
          <Box
            flex={5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
          >
            {!isLoading ? <Box display={'flex'} alignItems={"center"} flexDirection={'column'} p={'2em'}>
            <img width={'100%'} src={GIF} alt="disperse-gif" style={{ display:"inline-block", margin:"0 auto"}} />
            <Typography component={"p"} variant="p" fontWeight={800} lineHeight={'25px'} textAlign={{xs:"center",md:"left"}} my={"1em"} fontSize={{xs:"1rem",md:"1.5rem"}} fontFamily={"sans-serif"} color={'GrayText'}>
              {`This user has not posted anything yet`}
            </Typography>
            </Box>: ""}
          </Box>
        )}
        <RightDrawerProfile
          userId={currentUserId}
          handleClickOnUser={handleClickOnUser}
        />
      </Box>
    </>
  );
};

export default Profile;
