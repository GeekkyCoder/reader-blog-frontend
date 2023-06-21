import { useEffect, useState } from "react";
import UserBlogsHome from "./UserBlogsHome";

import axios from "axios";

const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [error, setError] = useState(false);

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
    <>
      {userPosts &&
        userPosts.map((userPost) => {
          return (
            <UserBlogsHome
              userPost={userPost}
              key={userPost._id}
              error={error}
              isLoading={isLoading}
              isSnackBarOpen={isSnackBarOpen}
            />
          );
        })}
    </>
  );
};

export default UserPost;
