import { useState, useEffect } from "react";

import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
  Stack,
  Snackbar,
  Alert,
  setRef,
} from "@mui/material";
import { InputField } from "./ArticlesModalStyles";

import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import axios from "axios";
import Skeleton from "../../components/Skeleton/Skeleton";

const UserPostModal = ({
  postId,
  isEditModalOpen,
  setIsEditModalOpen,
  handleCancelClick,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handlePostEditSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    const postObj = {
      title,
      description,
    };

    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `https://reader-blogging-web.onrender.com/api/v1/posts/updatePost?postId=${postId}`,
        postObj,
      );
      setIsSnackBarOpen(true);
      setSnackBarMessage("post updated successfully ✔");
      setIsLoading(false);
      setError(false);
      setTimeout(() => {
        setIsEditModalOpen(false);
        window.location.reload();
      }, 3000);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 5000);
    } catch (err) {
      console.log(err);
      setError(true);
      setSnackBarMessage("post update failed ❌");
      setIsLoading(false);
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
        setError(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const getCurrentSinglePost = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `/api/v1/posts/currentUserPost?postId=${postId}`
        );
        setTitle(data?.userPost?.title);
        setDescription(data?.userPost?.description);
        setSnackBarMessage("");
        setIsSnackBarOpen(true);
        setIsLoading(false);
        setError(false);
        setTimeout(() => {
          setIsSnackBarOpen(false);
        }, 5000);
      } catch (err) {
        setSnackBarMessage("something went wrong ❌");
        setError(true);
        setIsLoading(false);
        setIsSnackBarOpen(true);
        setTimeout(() => {
          setIsSnackBarOpen(false);
          setError(false);
        }, 5000);
      }
    };
    getCurrentSinglePost();
  }, []);

  return (
    <Box>
      {isLoading && <Skeleton />}
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={error ? "error" : "success"}>{snackBarMessage}</Alert>
      </Snackbar>
      <Dialog
        sx={{ fontFamily: "cursive" }}
        open={isEditModalOpen}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>{"Edit Your Post"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box component={"form"} onSubmit={handlePostEditSubmit}>
            <Box>
              <InputField
                required
                sx={{ width: "100%", fontFamily: "fantasy" }}
                variant="outlined"
                size="medium"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></InputField>
            </Box>

            <Box my={"2em"}>
              <InputField
                required
                sx={{ width: "100%" }}
                variant="outlined"
                size="medium"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                name="description"
                multiline
              ></InputField>
            </Box>

            <Stack direction={"row"} spacing={2}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                color="success"
                startIcon={<Send />}
              >
                Submit
              </LoadingButton>
              <Button
                onClick={handleCancelClick}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserPostModal;
