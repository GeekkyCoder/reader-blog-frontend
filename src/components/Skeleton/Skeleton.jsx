import { CircularProgress, Stack } from "@mui/material";

const Skeleton = () => {
  return (
    <Stack
      sx={{ color: "grey.600" }}
      spacing={2}
      direction="row"
      justifyContent={"center"}
    >
      <CircularProgress color="inherit"  />
    </Stack>
  );
};

export default Skeleton;
