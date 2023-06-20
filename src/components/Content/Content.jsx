import { Box, Stack } from "@mui/material";
import Articles from "../../pages/Articles/Articles";
import { Route, Routes } from "react-router-dom";
import UserBlogsHome from "../../pages/Articles/UserBlogsHome";

const Content = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box flex={{ xs: 10, sm: 5 }}>
        <Articles />
      </Box>

      <Box height={"100vh"} flex={1} display={{ xs: "none", sm: "block" }}>
        <Box position={"fixed"}>Sidebar</Box>
      </Box>
    </Stack>
  );
};

export default Content;
