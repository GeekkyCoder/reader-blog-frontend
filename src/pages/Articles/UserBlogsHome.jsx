import {
  Avatar,
  Box,
  Container,
  Divider,
  Tooltip,
  Typography,
  Stack,
  Alert,
  Snackbar,
  Chip,
  Button,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import { formatDate } from "../../utils/convertToDate";

import Skeleton from "../../components/Skeleton/Skeleton";

import "./article.css";
import {
  DeleteOutlineOutlined,
  Delete,
  Edit,
  EditOutlined,
} from "@mui/icons-material";

const UserBlogsHome = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isEditButtonHovered, setIsEditButtonHovered] = useState(false);
  const [isDeleteButtonHoverd, setIsDeleteButtonHovered] = useState(false);

  const handleMouseEnterInEditButton = () => {
    setIsEditButtonHovered(true);
  };

  const handleMouseLeaveInEditButton = () => {
    setIsEditButtonHovered(false);
  };

  const handleMouseEnterDeleteButton = () => {
    setIsDeleteButtonHovered(true);
  };

  const handleMouseLeaveDeleteButton = () => {
    setIsDeleteButtonHovered(false);
  };

  const editIcon = () => {
    if (isEditButtonHovered) {
      return <Edit fontSize="small" />;
    } else {
      return <EditOutlined fontSize="small" />;
    }
  };

  const deleteIcon = () => {
    if (isDeleteButtonHoverd) {
      return <Delete fontSize="small" />;
    } else {
      return <DeleteOutlineOutlined fontSize="small" />;
    }
  };

  const UserPostsJsx = useMemo(() => {
    return (
      <>
        {userPosts.map((userPost) => {
          return (
            <Stack
              key={userPost._id}
              direction={"column"}
              alignItems={"center"}
              display={"flex"}
              mt={"3em"}
            >
              <Box width={{ xs: "100%", sm: "70%" }}>
                <Typography
                  variant="h2"
                  component={"h3"}
                  fontWeight={{ xs: 800, sm: 800 }}
                  fontSize={{ xs: "1.5rem", sm: "3rem" }}
                >
                  {userPost.title}
                </Typography>

                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  my={"2em"}
                  position={"relative"}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <Tooltip title={`${userPost.name}`}>
                      <Avatar
                        sx={{ alignSelf: "flex-start", width: 56, height: 56 }}
                        src={userPost?.profileImage}
                        alt={userPost?.profileImage}
                      ></Avatar>
                    </Tooltip>

                    <Box ml={".5em"} mb={{ xs: "1em", sm: "0em" }}>
                      <Typography component={"p"} variant="p">
                        {userPost?.name}
                      </Typography>
                      {userPost.bio && (
                        <Typography
                          variant="p"
                          component={"p"}
                          my={".5em"}
                          color={"GrayText"}
                        >
                          {userPost.bio}
                        </Typography>
                      )}
                      <Typography
                        component={"p"}
                        variant="p"
                        color={"GrayText"}
                      >
                        Published on
                        <Typography
                          ml={".5em"}
                          component={"span"}
                          variant="span"
                        >
                          {formatDate(userPost?.createdAt)}
                        </Typography>
                        <Box my={"1em"}>
                          <Chip
                            variant="filled"
                            label={userPost?.tags}
                            size="large"
                          />
                        </Box>
                      </Typography>
                    </Box>
                  </Box>

                  <Box alignSelf={"flex-start"}>
                    <Tooltip title={"edit this post"}>
                      <Button
                        sx={{ mx: "1em" }}
                        color="inherit"
                        variant="contained"
                        endIcon={editIcon()}
                        onMouseEnter={handleMouseEnterInEditButton}
                        onMouseLeave={handleMouseLeaveInEditButton}
                      >
                        Edit
                      </Button>
                    </Tooltip>

                    <Tooltip title={"delete this post"}>
                      <Button
                        color="inherit"
                        variant="contained"
                        endIcon={deleteIcon()}
                        onMouseEnter={handleMouseEnterDeleteButton}
                        onMouseLeave={handleMouseLeaveDeleteButton}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </Box>

                  <Typography
                    color={"GrayText"}
                    position={"absolute"}
                    bottom={{ xs: "-1.5rem", sm: "-1rem" }}
                    right={"0"}
                    component={"p"}
                    variant="p"
                  >
                    last updated: {formatDate(userPost.updatedAt)}
                  </Typography>
                </Box>

                <Divider />

                <img
                  style={{ margin: "1em 0" }}
                  width={"100%"}
                  src={userPost?.image}
                  alt={`blog-${userPost?._id}`}
                />

                <Typography
                  className="fade-description fade-description-user-home"
                  variant="p"
                  lineHeight={"30px"}
                  my={"1em"}
                  fontWeight={400}
                  component={"p"}
                >
                  {userPost?.description}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </>
    );
  }, [userPosts, isEditButtonHovered, isDeleteButtonHoverd]);

  useEffect(() => {
    const fetchCurrentUserBlogs = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/v1/posts/user/posts");
        setUserPosts(data?.posts);
        setIsLoading(false);
        setError(false);
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
      } catch (err) {
        setError(true);
        setIsLoading(false);
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
      }
    };
    fetchCurrentUserBlogs();
  }, []);

  return (
    <Container>
      {error && (
        <Snackbar
          open={isSnackBarOpen}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={!error ? "success" : "error"}>
            {!error
              ? "user blog posts fetched successfully"
              : "fetching failed"}
          </Alert>
        </Snackbar>
      )}
      {userPosts.length > 0 ? (
        <Box>{UserPostsJsx}</Box>
      ) : (
        <Box mt={"5em"}>
          <Skeleton />
        </Box>
      )}
    </Container>
  );
};

export default UserBlogsHome;
