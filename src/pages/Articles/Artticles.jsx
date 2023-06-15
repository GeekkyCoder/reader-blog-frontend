import { Box, Stack } from "@mui/material";

import { Routes, Route } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";

export const Article = () => {
  const [blogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/posts/allPosts"
        );
        console.log(data);
        setAllBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBlogs();
  }, []);

  console.log(blogs);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box bgcolor={"red"} height={"100vh"} flex={4}>
        {JSON.stringify(blogs)}
      </Box>
      <Box bgcolor={"blue"} height={"100vh"} flex={1}>
        <Box position={"fixed"}>Sidebar</Box>
      </Box>
    </Stack>
  );
};
