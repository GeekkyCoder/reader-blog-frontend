import { useEffect, useState, useRef } from "react";
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

import { Close, Save } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { userSelectorReducer } from "../../store/user/userSelector";
import { LoadingButton } from "@mui/lab";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "../../store/user/user.actions";

export const Profile = () => {
  const textAreaRef = useRef(null);

  const navigate = useNavigate();

  // current user just to grab some information for current user from backend
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileChoosen, setFileChoosen] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [fieldsDisable, setFieldsDisable] = useState(true);
  const [isDrawerClose, setIsDrawerClose] = useState(true);

  const user = useSelector(userSelectorReducer);
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    name: "",
    bio: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/auth/currentUser",
          {
            headers: {
              Authorization: `Bearer ${user.currentUser.token}`,
            },
          }
        );
        setCurrentUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, [user]);

  const updateUserProfilePicture = async () => {
    const image = formFields.profileImage;

    // image -> something.png

    const formData = new FormData();
    formData.append("image", image);

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/uploadUserProfileImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.currentUser.token}`,
          },
        }
      );
      setIsLoading(false);
      setFileChoosen(false);
      setSnackbarMessage(data.msg);
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
        window.location.reload(true);
      }, 3000);
      setError(false);
    } catch (err) {
      if (err.message) {
        setIsSnackBarOpen(true);
        setError(true);
        setSnackbarMessage(err.message);
        setIsLoading(false);
        setFileChoosen(false);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 3000);
      }
    }
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      name: formFields.name,
      email: formFields.email,
      bio: formFields.bio,
    };

    //submit the user information
    setIsLoading(true);
    dispatch(FETCH_USER_START());
    try {
      const { data } = await axios.patch(
        "http://localhost:8000/api/v1/auth/updateuser",
        userObj,
        {
          headers: {
            Authorization: `Bearer ${user.currentUser.token}`,
          },
        }
      );
      dispatch(FETCH_USER_SUCCESS(data));
      setIsDrawerClose(false);
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
        // window.location.reload(true);
        setIsDrawerClose(false);
        navigate("/");
      }, 5000);
      setSnackbarMessage("profile information updated ✔");
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setIsDrawerClose(true);
      setSnackbarMessage("could not update profile information");
      setIsSnackBarOpen(true);
      setError(true);
      setIsLoading(false);
      dispatch(FETCH_USER_FAILED(err));
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 5000);
    }
  };

  useEffect(() => {
    setFormFields((prevFields) => {
      return {
        ...prevFields,
        name: currentUser.name,
        bio: currentUser.bio,
        email: currentUser.email,
        profileImage: currentUser.profileImage,
      };
    });
  }, [currentUser]);

  const handleEditClick = () => {
    setFieldsDisable(false);
  };

  const handleFormFieldChanges = (e) => {
    const { name, value, type } = e.target;

    if (type === "textarea") {
      setFormFields({ ...formFields, bio: textAreaRef.current.value });
      setFileChoosen(true);
    }

    if (type === "file") {
      setFormFields({ ...formFields, [name]: e.target.files[0] });
      setFileChoosen(true);
      return;
    } else {
      setFileChoosen(false);
    }

    setFormFields({ ...formFields, [name]: value });
  };

  const handleDrawerClose = () => {
    setIsDrawerClose(false);
    navigate("/");
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
                {currentUser.name.toUpperCase()}
              </Typography>
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleUserFormSubmit}
              disabled={fieldsDisable}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component={"form"} sx={{ width: "50%" }} mt={"4em"}>
            <Stack direction={"column"} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "2em 0",
                }}
              >
                <Box flex={2}>
                  <TextField
                    disabled={fieldsDisable}
                    sx={{ width: "70%" }}
                    variant="standard"
                    value={formFields.name}
                    name="name"
                    onChange={handleFormFieldChanges}
                  ></TextField>
                </Box>

                <Box sx={{ flex: 2 }}>
                  <TextField
                    disabled={fieldsDisable}
                    sx={{ width: "70%" }}
                    variant="standard"
                    value={formFields.email}
                    name="email"
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
                <Box flex={5}>
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
                      disabled={fieldsDisable || fileChoosen}
                      type="file"
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
                        <IconButton sx={{ marginLeft: { xs: ".6em", sm: 0 } }}>
                          <Avatar
                            src={currentUser.profileImage}
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
    </>
  );
};
