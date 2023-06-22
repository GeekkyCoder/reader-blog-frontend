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

import { useCallback, useMemo, useState } from "react";

import { formatDate } from "../../utils/convertToDate";

import Skeleton from "../../components/Skeleton/Skeleton";

import "./article.css";
import {
  DeleteOutlineOutlined,
  Delete,
  Edit,
  EditOutlined,
  ExpandCircleDownOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";

import UserPostModal from "./UserPostModal";

import axios from "axios";

const UserBlogsHome = ({ userPost, error, isSnackBarOpen }) => {
  const [isEditButtonHovered, setIsEditButtonHovered] = useState(false);
  const [isDeleteButtonHoverd, setIsDeleteButtonHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleShowMore = (postId) => {
    setShowMore((prevState) => !prevState);
  };

  const editIcon = useCallback(() => {
    if (isEditButtonHovered) {
      return <Edit fontSize="small" />;
    } else {
      return <EditOutlined fontSize="small" />;
    }
  }, [isEditButtonHovered]);

  const showButtonIcon = () => {
    if (showMore) {
      return <ExpandCircleDownOutlined fontSize="small" />;
    } else {
      return <RemoveCircleOutline fontSize="small" />;
    }
  };

  const deleteIcon = useCallback(() => {
    if (isDeleteButtonHoverd) {
      return <Delete fontSize="small" />;
    } else {
      return <DeleteOutlineOutlined fontSize="small" />;
    }
  }, [isDeleteButtonHoverd]);

  const buttonShowMoreClass = `${
    !showMore
      ? "fade-description-user-show-home-unset"
      : "fade-description-user-home"
  }`;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = async (postId) => {
    const shouldDelete = window.confirm(
      "are you are you want to delete your post ?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(`https://reader-blogging-web.onrender.com/api/v1/posts/deletePost?post=${postId}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const UserPostsJsx = useMemo(() => {
    return (
      <Box>
        {isEditModalOpen && (
          <UserPostModal
            isEditModalOpen={isEditModalOpen}
            handleCancelClick={handleCancelClick}
            postId={userPost._id}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        )}
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
                  <Typography component={"p"} variant="p" color={"GrayText"}>
                    Published on
                    <Typography ml={".5em"} component={"span"} variant="span">
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
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </Tooltip>

                <Tooltip title={"delete this post"}>
                  <Button
                    sx={{ my: { xs: "1em", sm: "0em" } }}
                    color="inherit"
                    variant="contained"
                    endIcon={deleteIcon()}
                    onMouseEnter={handleMouseEnterDeleteButton}
                    onMouseLeave={handleMouseLeaveDeleteButton}
                    onClick={() => handleDeleteClick(userPost._id)}
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
              className={`fade-description ${buttonShowMoreClass} `}
              variant="p"
              lineHeight={"30px"}
              my={"1em"}
              fontWeight={400}
              component={"p"}
            >
              {userPost?.description}
            </Typography>
            <Tooltip title={"show more content"}>
              <Button
                onClick={handleShowMore}
                endIcon={showButtonIcon()}
                variant="text"
                color="inherit"
                sx={{
                  fontWeight: 800,
                  marginLeft: "auto",
                  display: "flex",
                  width: 200,
                  justifyContent: "felx-end",
                  alignItems: "center",
                }}
              >
                Show {showMore ? "more" : "less"}
              </Button>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    );
  }, [
    userPost,
    isEditButtonHovered,
    isDeleteButtonHoverd,
    showMore,
    isEditModalOpen,
  ]);

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
      {Object.keys(userPost).length > 0 ? (
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
