import { Box, Skeleton, Stack } from "@mui/material";
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
        <Box position={"fixed"}>Sidebar under development</Box>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Content;
