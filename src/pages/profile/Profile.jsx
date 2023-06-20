import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Dialog,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
  Stack,
  TextField,
  Snackbar,
  Fade,
  Alert,
  Avatar,
  Tooltip,
} from "@mui/material";

import { Close, Save, Error } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  currentUserSelector,
  userLoadingSelector,
  userTokenSelector,
} from "../../store/user/userSelector";
import { LoadingButton } from "@mui/lab";
import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
} from "../../store/user/user.actions";

import AlertIcon from "../../Assets/alert-icon.png";

const Profile = () => {
  const navigate = useNavigate();

  // current user just to grab some information for current user from backend
  const [isLoading, setIsLoading] = useState(false);
  const [fileChoosen, setFileChoosen] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [fieldsDisable, setFieldsDisable] = useState(true);
  const [isDrawerClose, setIsDrawerClose] = useState(true);

  const currentUser = useSelector(currentUserSelector);
  const isUserLoading = useSelector(userLoadingSelector);
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    name: "",
    bio: "",
    profileImage: "",
  });

  const updateUserProfilePicture = useCallback(async () => {
    const image = formFields.profileImage;

    // image -> something.png

    const formData = new FormData();
    formData.append("image", image);

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/uploadUserProfileImage",
        formData,{
          withCredentials:true
        }
      );
      setIsLoading(false);
      setFileChoosen(false);
      setSnackbarMessage("profile picture updated ✔");
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
        window.location.reload(true);
      }, 3000);
      setError(false);
    } catch (err) {
      setIsSnackBarOpen(true);
      setError(true);
      setSnackbarMessage("❌profile picture update failed");
      setIsLoading(false);
      setFileChoosen(false);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
    }
  }, [formFields]);

  const handleUserFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userObj = {
        name: formFields.name,
        bio: formFields.bio,
      };

      //submit the user information

      dispatch(FETCH_USER_START());
      try {
        const { data } = await axios.patch("http://localhost:8000/api/v1/auth/updateuser", userObj,{
          withCredentials:true
        });
        dispatch(FETCH_USER_SUCCESS(data));
        setIsDrawerClose(false);
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
          // window.location.reload(true);
          setIsDrawerClose(false);
          navigate("/");
        }, 3000);
        setSnackbarMessage("profile information updated ✔");
      } catch (err) {
        dispatch(FETCH_USER_FAILED(err));
        setIsDrawerClose(true);
        setSnackbarMessage("❌ could not update profile information");
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
      }
    },
    [formFields, currentUser]
  );

  useEffect(() => {
    setFormFields((prevFields) => {
      return {
        ...prevFields,
        name: currentUser?.user?.name,
        bio: currentUser?.user?.bio,
        profileImage: currentUser?.user.profileImage,
      };
    });
  }, [currentUser]);

  const handleEditClick = () => {
    setFieldsDisable(false);
  };

  const handleFormFieldChanges = useCallback(
    (e) => {
      const { name, value, type } = e.target;

      if (type === "file") {
        setFormFields({ ...formFields, [name]: e.target.files[0] });
        setFileChoosen(true);
        return;
      } 
      setFormFields({ ...formFields, [name]: value });
    },
    [currentUser, formFields]
  );

  const handleDrawerClose = () => {
    setIsDrawerClose(false);
    navigate("/");
  };

  const handleReaderButtonClick = () => {
    navigate("/auth");
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        open={isSnackBarOpen}
      >
        <Alert severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {currentUser ? (
        <Dialog
          fullScreen
          open={isDrawerClose}
          //   onClose={handleClose}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                fontWeight={800}
                fontStyle={"normal"}
                variant="h6"
                component="div"
                color={"cornsilk"}
              >
                Welcome{" "}
                <Typography
                  variant="p"
                  component={"span"}
                  fontFamily={"sans-serif"}
                  fontWeight={800}
                >
                  {currentUser?.user?.name || "Guest"}
                </Typography>
              </Typography>
              <LoadingButton
                loading={isUserLoading}
                autoFocus
                color="inherit"
                onClick={handleUserFormSubmit}
                disabled={fieldsDisable}
              >
                save
              </LoadingButton>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", xs: "center" },
              alignItems: { xs: "start", sm: "center" },
            }}
          >
            <Box
              component={"form"}
              sx={{ width: { xs: "100%", sm: "50%" } }}
              mt={"4em"}
            >
              <Stack direction={"column"} spacing={2} padding={"2em"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", sm: "end" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    margin: { xs: "0em", sm: "2em 0" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box flex={{ xs: 1, sm: 2 }}>
                    <TextField
                      disabled={fieldsDisable}
                      sx={{ width: { xs: "100%", sm: "70%" } }}
                      variant="standard"
                      value={formFields.name}
                      name="name"
                      onChange={handleFormFieldChanges}
                    ></TextField>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", sm: "end" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    margin: { xs: "0em", sm: "2em 0" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box flex={{ xs: 1, sm: 5 }} width={"100%"}>
                    <TextField
                      sx={{ width: "100%" }}
                      variant="outlined"
                      disabled={fieldsDisable}
                      placeholder={
                        formFields.bio || "⭐ How would you describe yourself"
                      }
                      name="bio"
                      value={formFields.bio}
                      maxRows={3}
                      size="medium"
                      onChange={handleFormFieldChanges}
                    ></TextField>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2em 0",
                  }}
                >
                  <Box flex={4} m={"2em 0"}>
                    <Typography variant="p" component={"p"}>
                      Update Profile picture
                    </Typography>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      m={"1em 0"}
                    >
                      <TextField
                        disabled={fieldsDisable}
                        type="file"
                        accept="image/*"
                        variant="outlined"
                        name="profileImage"
                        onChange={handleFormFieldChanges}
                      ></TextField>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Tooltip>
                          <IconButton
                            sx={{ marginLeft: { xs: ".6em", sm: 0 } }}
                          >
                            <Avatar
                              src={currentUser?.profileImage}
                              alt={"user-profile"}
                            ></Avatar>
                          </IconButton>
                        </Tooltip>

                        <LoadingButton
                          startIcon={<Save />}
                          disabled={fileChoosen === false}
                          loading={isLoading}
                          onClick={updateUserProfilePicture}
                          color="secondary"
                          variant="contained"
                          size="large"
                        >
                          Save
                        </LoadingButton>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>

                <Button
                  onClick={handleEditClick}
                  variant="contained"
                  color="primary"
                  sx={{ display: "block", width: "300px", margin: "0 auto" }}
                >
                  Edit
                </Button>
              </Stack>
            </Box>
          </Box>
        </Dialog>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Avatar src={AlertIcon} alt="error-image"></Avatar>
          <Typography component={"h2"} variant="'p">
            Register Yourself to{" "}
            <Button
              onClick={handleReaderButtonClick}
              variant="text"
              color="error"
              size="large"
            >
              READER
            </Button>
            to see and update your profile settings
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Profile;
