import {
  Box,
  Dialog,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import { Close } from "@mui/icons-material";

export const Profile = () => {
  return (
    <Dialog
      fullScreen
      open={true}
      //   onClose={handleClose}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            // onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Your Profile
          </Typography>
          <Button autoFocus color="inherit">
            save
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", border:"2px solid red"}}>
         Hello
      </Box>
    </Dialog>
  );
};
