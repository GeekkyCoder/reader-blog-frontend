import { forwardRef, useState } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  TextField,
  Autocomplete,
  Typography,
  Stack,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { FormContainer, InputField } from "./ArticlesModalStyles";

import { LoadingButton } from "@mui/lab";
import { Cancel, PostAdd, Save } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_BLOGS_FAILED,
  FETCH_BLOGS_START,
  TOGGLE_ISMODALOPEN,
} from "../../store/blogs/blogs.actions";
import {
  isModalOpenSelector,
} from "../../store/blogs/blogs.selector";
import { CLOUDINARY_CLOUD_NAME } from "../../utils/utils";

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

const ArticlesModals = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(isModalOpenSelector);

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isLoading,setIsloading] = useState(false)
  const [error,setError] = useState(false)

  const [postFields, setPostFields] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    view: "",
  });

  //   const Transition = forwardRef(function Transition(props, ref) {
  //     return <Slide direction="up" ref={ref} {...props} />;
  //   });

  const handlPostSubmit = async (e) => {
    e.preventDefault();

    if (!postFields.title || !postFields.description) return;

    setIsloading(true)
    setError(false)
    try {
      await axios.post("/api/v1/posts/createPost", postFields);
      setSnackBarMessage("posted");
      setIsloading(false)
      setIsImageUpload(false)
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
    } catch (err) {
      setSnackBarMessage("failed to post");
      setError(true)
      setIsSnackBarOpen(true);
      setIsloading(false)
      setTimeout(() => {
        setIsSnackBarOpen(false);
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
    setIsloading(true)
    setError(false)
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setPostFields({ ...postFields, image: data.secure_url });
      setIsSnackBarOpen(true)
      setIsloading(false)
      setSnackBarMessage('image uploaded successfully!')
      setTimeout(()=> {
        setIsSnackBarOpen(false)
      },3000)
    } catch (err) {
      setError(true)
      setIsSnackBarOpen(true)
      setIsloading(false)
      setSnackBarMessage('image upload failed!')
      setTimeout(()=> {
        setIsSnackBarOpen(false)
      },3000)

    }
  };

  return (
    <>
      <Snackbar message={snackBarMessage} open={isSnackBarOpen} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
        <Alert variant="filled" severity={error ? "error" : "success"}>{snackBarMessage}</Alert>
      </Snackbar>
      <Dialog
        sx={{ fontFamily: "cursive" }}
        open={isModalOpen}
        fullWidth={true}
        maxWidth="lg"
        //   TransitionComponent={Transition}
        keepMounted
        //   onClose={}
        aria-describedby="alert-dialog-slide-description"
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
                onChange={hanldePostFieldChanges}
                value={postFields.title}
                name="title"
              ></InputField>
            </Box>

            <Box my={"2em"}>
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
            </Box>

            <Box>
              <Typography component={"h4"} variant="'p" color={"GrayText"}>
                Choose blog image:
              </Typography>
            </Box>

            <Box my={"2em"} sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <InputField
                  type="file"
                  variant="outlined"
                  size="medium"
                  onChange={hanldePostFieldChanges}
                  name="image"
                ></InputField>
              </Box>

              <Box>
                <LoadingButton
                  sx={{ marginLeft: "2em" }}
                  variant="contained"
                  size="large"
                  color="success"
                  onClick={handleBlogImageUpload}
                  loading={isLoading}
                  disabled={!isImageUpload}
                  startIcon={<Save />}
                >
                  Upload
                </LoadingButton>
              </Box>
            </Box>
            <Divider />
            <DialogActions>
              <Stack direction="row" spacing={1}>
                <Button
                  sx={{ width: "150px" }}
                  variant="contained"
                  size="large"
                  color="error"
                  endIcon={<Cancel />}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ width: "150px" }}
                  endIcon={<PostAdd />}
                >
                  Post
                </LoadingButton>
              </Stack>
            </DialogActions>
          </FormContainer>
        </DialogContent>
        {/* <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ArticlesModals;
