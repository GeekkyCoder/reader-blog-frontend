import { CircularProgress,Box } from "@mui/material";

const Skeleton = () => {
  return (
    <Box>
      <CircularProgress color="inherit" size={'large'} />
    </Box>
  );
};

export default Skeleton
