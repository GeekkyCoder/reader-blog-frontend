import { Box, Stack } from "@mui/material";
import Articles from "../../pages/Articles/Articles";

const Content = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box flex={5} sx={{ border: "2px solid red" }}>
        <Articles />
      </Box>

      <Box bgcolor={"blue"} height={"100vh"} flex={1}>
        <Box position={"fixed"}>Sidebar</Box>
      </Box>
    </Stack>
  );
};

export default Content;
