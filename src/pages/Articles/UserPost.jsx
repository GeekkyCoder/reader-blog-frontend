import { useEffect, useState } from "react";
import UserBlogsHome from "./UserBlogsHome";

import { Box, Typography } from "@mui/material";

import axios from "axios";
import { currentUserSelector } from "../../store/user/userSelector";

import { useSelector } from "react-redux";

const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [hasPostBeenEdited, setHasPostBeenEdited] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    const fetchCurrentUserBlogs = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://reader-blogging-web.onrender.com/api/v1/posts/user/posts?user=${currentUser?.user?._id}`,
          {
            withCredentials: true,
          }
        );
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
  }, [isPostDeleted, hasPostBeenEdited]);

  return (
    <>
      {userPosts.length ? (
        userPosts.map((userPost) => {
          return (
            <UserBlogsHome
              setHasPostBeenEdited={setHasPostBeenEdited}
              setIsPostDeleted={setIsPostDeleted}
              userPost={userPost}
              key={userPost._id}
              error={error}
              isLoading={isLoading}
              isSnackBarOpen={isSnackBarOpen}
              setUserPosts={setUserPosts}
            />
          );
        })
      ) : (
        <>
          {!isLoading && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100vh"}
              fontWeight={800}
            >
              <Typography
                component={"p"}
                variant="h4"
                color={"GrayText"}
                fontFamily={"cursive"}
                textAlign={"center"}
              >
                {currentUser?.user?.name.split(" ")[0]}, create your first post
                by clicking on Write Above{" "}
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default UserPost;
