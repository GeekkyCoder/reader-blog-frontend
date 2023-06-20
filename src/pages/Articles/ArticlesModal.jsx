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

  
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const dispatch = useDispatch();

  const isModalOpen = useSelector(isModalOpenSelector);

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const [postFields, setPostFields] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    view: "",
  });

  const handlPostSubmit = async (e) => {
    e.preventDefault();

    if (!postFields.title || !postFields.description) return;

    setIsloading(true);
    setError(false);

    const payload = {
      title: postFields.title,
      description: postFields.description,
      image:
        postFields.image ||
        "https://images.unsplash.com/photo-1542254503-d802f00c2342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
      tags: postFields.tags || "general",
      view: postFields.view || "public",
    };

    try {
      await axios.post(
        "http://localhost:8000/api/v1/posts/createPost",
        payload,
        {
          withCredentials: true,
        }
      );
      setSnackBarMessage("posted");
      setIsloading(false);
      setIsImageUpload(false);
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
      dispatch(TOGGLE_ISMODALOPEN(false));
    } catch (err) {
      setSnackBarMessage("failed to post");
      setError(true);
      setIsSnackBarOpen(true);
      setIsloading(false);
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
    setIsloading(true);
    setError(false);
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dczhcauwf/image/upload`,
        formData
      );
      setPostFields({ ...postFields, image: data.secure_url });
      setIsSnackBarOpen(true);
      setIsloading(false);
      setSnackBarMessage("image uploaded successfully!");
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(true);
      setIsSnackBarOpen(true);
      setIsloading(false);
      setSnackBarMessage("image upload failed!");
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <Snackbar
        message={snackBarMessage}
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={error ? "error" : "success"}>
          {snackBarMessage}
        </Alert>
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
                onChange={(e) => {
                  setPostFields({...postFields,title:e.target.value})
                }}
                value={postFields.title}
              ></InputField>
         
            </Box>

            <Box my={"2em"}>
              <Tooltip title={'description must not be less than 20 characters'} placement="top-start">
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
              <BootstrapTooltip
                placement="top-start"
                title={
                  "we will add a dummy/blurry image,incase if you dont want to upload an image!!!"
                }
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
              </BootstrapTooltip>

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
                  loading={isLoading}
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
        {/* <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ArticlesModals;
