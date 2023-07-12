import { useState } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Autocomplete,
  Typography,
  Stack,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  styled,
} from "@mui/material";

import { tooltipClasses } from "@mui/material/Tooltip";

import { FormContainer, InputField } from "./ArticlesModalStyles";

import { LoadingButton } from "@mui/lab";
import { Cancel, PostAdd, Save } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_ISMODALOPEN } from "../../store/blogs/blogs.actions";
import { isModalOpenSelector } from "../../store/blogs/blogs.selector";
import {
  SET_IS_LOADING,
  SET_IS_SNACKBAR_OPEN,
  SET_ERROR,
  SET_SNACK_BAR_MESSAGE,
} from "../../store/actions/actions.actions";

import {
  errorActionSelector,
  isSnackBarOpenActionSelector,
  loadingActionSelector,
  snackbarMessageActionSelector,
} from "../../store/actions/actionSelector";

const viewOptions = ["public", "private", "followers"];

const tagsOptions = [
  "technology",
  "science",
  "politics",
  "history",
  "health and fitness",
  "coding",
  "general",
];

const ArticlesModals = ({ setFetchNewOnCreate }) => {
  const [isImageUpload, setIsImageUpload] = useState(false);

  const [postFields, setPostFields] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    view: "",
  });

  const dispatch = useDispatch();

  const isModalOpen = useSelector(isModalOpenSelector);

  const actionIsLoading = useSelector(loadingActionSelector);
  const actionSnackBarMessage = useSelector(snackbarMessageActionSelector);
  const actionIsSnackBarOpen = useSelector(isSnackBarOpenActionSelector);
  const actionErrorSelector = useSelector(errorActionSelector);

  const handlPostSubmit = async (e) => {
    e.preventDefault();

    if (!postFields.title || !postFields.description) return;

    const payload = {
      title: postFields.title,
      description: postFields.description,
      image:
        postFields.image ||
        "https://images.unsplash.com/photo-1542254503-d802f00c2342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
      tags: postFields.tags || "general",
      view: postFields.view || "public",
    };

    dispatch(SET_IS_LOADING());
    try {
      await axios.post(
        "https://reader-blogging-web.onrender.com/api/v1/posts/createPost",
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(SET_SNACK_BAR_MESSAGE("posted"));
      setIsImageUpload(false);
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      setFetchNewOnCreate((prevStat) => !prevStat);
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 3000);
      dispatch(TOGGLE_ISMODALOPEN(false));
    } catch (err) {
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      dispatch(SET_SNACK_BAR_MESSAGE("failed to post"));
      dispatch(SET_ERROR(err?.response?.data?.msg || "failed to post"));
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 3000);
    }
  };

  const handleCancelClick = () => {
    dispatch(TOGGLE_ISMODALOPEN(false));
  };

  const hanldePostFieldChanges = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    if (type === "file") {
      setPostFields({ ...postFields, [name]: e.target.files[0] });
      setIsImageUpload(true);
    } else {
      setPostFields({ ...postFields, [name]: value });
    }
  };

  const handleBlogImageUpload = async (e) => {
    const imageFile = postFields.image;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "lfueeeon");
    dispatch(SET_IS_LOADING());
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dczhcauwf/image/upload`,
        formData
      );
      setPostFields({ ...postFields, image: data.secure_url });
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      dispatch(SET_SNACK_BAR_MESSAGE("image uploaded successfully!"));
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 3000);
    } catch (err) {
      dispatch(
        SET_ERROR(err?.response?.data?.msg || "failed to upload image!")
      );
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      dispatch(SET_SNACK_BAR_MESSAGE("failed tp upload image"));
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 3000);
    }
  };

  return (
    <>
      <Snackbar
        message={actionSnackBarMessage}
        open={actionIsSnackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity={actionErrorSelector ? "error" : "success"}
        >
          {actionSnackBarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        sx={{ fontFamily: "cursive" }}
        open={isModalOpen}
        fullScreen
        fullWidth={true}
        maxWidth="lg"
        //   TransitionComponent={Transition}
        keepMounted
        //   onClose={}
      >
        <DialogTitle>{"Create A Blog"}</DialogTitle>
        <Divider />
        <DialogContent>
          <FormContainer
            onSubmit={handlPostSubmit}
            component="form"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Stack
              direction={"row"}
              justifyContent={"right"}
              alignItems={"center"}
            >
              <Autocomplete
                //  value={tags}
                inputValue={postFields.tags}
                fontFamily={"inherit"}
                size="medium"
                onInputChange={(e, newValue) => {
                  setPostFields({ ...postFields, tags: newValue });
                }}
                name="tags"
                options={tagsOptions}
                sx={{ width: 200, mr: "2em" }}
                renderInput={(params) => (
                  <TextField {...params} label="general" />
                )}
              />

              <Autocomplete
                //  value={view}
                inputValue={postFields.view}
                fontFamily={"inherit"}
                size="medium"
                onInputChange={(e, newValue) => {
                  setPostFields({ ...postFields, view: newValue });
                }}
                name="view"
                options={viewOptions}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="public" />
                )}
              />
            </Stack>

            <Box my={"2em"}>
              <InputField
                required
                placeholder="What do you want to talk about?"
                label="Title"
                sx={{ width: "100%", fontFamily: "fantasy" }}
                variant="outlined"
                size="medium"
                onChange={(e) => {
                  setPostFields({ ...postFields, title: e.target.value });
                }}
                value={postFields.title}
              ></InputField>
            </Box>

            <Box my={"2em"}>
              <Tooltip
                title={"description must not be less than 20 characters"}
                placement="top-start"
              >
                <InputField
                  required
                  label="Description"
                  placeholder="What's on your mind"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  size="medium"
                  onChange={hanldePostFieldChanges}
                  value={postFields.description}
                  name="description"
                  multiline
                ></InputField>
              </Tooltip>
            </Box>

            <Box>
              <Typography component={"h4"} variant="'p" color={"GrayText"}>
                Choose blog image:
              </Typography>
            </Box>

            <Box my={"2em"} sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                placement="top-start"
                title={"for better resolutions use a landscape image "}
              >
                <Box>
                  <InputField
                    type="file"
                    variant="outlined"
                    size="medium"
                    onChange={hanldePostFieldChanges}
                    name="image"
                  ></InputField>
                </Box>
              </Tooltip>

              <Box>
                <LoadingButton
                  sx={{ marginLeft: "2em" }}
                  variant="contained"
                  size="large"
                  color="success"
                  onClick={handleBlogImageUpload}
                  loading={actionIsLoading}
                  disabled={!isImageUpload}
                  startIcon={<Save />}
                >
                  Upload
                </LoadingButton>
              </Box>
            </Box>
            <Divider />
            <DialogActions>
              <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
                <Button
                  sx={{ width: { xs: "100px", sm: "150px" } }}
                  variant="text"
                  size="medium"
                  color="error"
                  endIcon={<Cancel />}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={actionIsLoading}
                  variant="text"
                  color="success"
                  size="medium"
                  sx={{ width: { xs: "100px", sm: "150px" } }}
                  endIcon={<PostAdd />}
                >
                  Publish
                </LoadingButton>
              </Stack>
            </DialogActions>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticlesModals;
