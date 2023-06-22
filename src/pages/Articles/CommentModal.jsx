import { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Comments from "./Comments";

import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CloseOutlined, Send } from "@mui/icons-material";

import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

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


const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

function CommentModal({ isCommentModalOpen, setIsCommentModalOpen, blogId }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);


  const dispatch = useDispatch()
  
  const actionIsLoading = useSelector(loadingActionSelector);
  const actionSnackBarMessage = useSelector(snackbarMessageActionSelector);
  const actionIsSnackBarOpen = useSelector(isSnackBarOpenActionSelector);
  const actionErrorSelector = useSelector(errorActionSelector);

  const handleCommentFieldChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const commentObj = {
      content,
    };

    try {
      dispatch(SET_IS_LOADING())
      const { data } = await axios.post(
        `https://reader-blogging-web.onrender.com/api/v1/comments/createComment?postId=${blogId} `,
        commentObj
      );
      dispatch(SET_SNACK_BAR_MESSAGE("comment posted"))
      dispatch(SET_IS_SNACKBAR_OPEN(true))
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false))
      },5000);
    } catch (err) {
      dispatch(SET_ERROR(err?.response?.data?.msg || "failed to comment"))
      dispatch(SET_IS_SNACKBAR_OPEN(true))
      dispatch(SET_SNACK_BAR_MESSAGE(err?.response?.data?.msg || "failed to comment"))
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false))
      },5000);
    }
  };

  useEffect(() => {
    const fecthCommentsForThisPost = async () => {
      dispatch(SET_IS_LOADING())
      try {
        const { data } = await axios.get(
          `/api/v1/comments/allComments?post=${blogId}`
        );
        setComments(data?.comments[0].comments);
        dispatch(SET_IS_SNACKBAR_OPEN(true))
        // dispatch(SET_SNACK_BAR_MESSAGE("✔"))
        setTimeout(() => {
          dispatch(SET_IS_SNACKBAR_OPEN(false))
        },5000)
      } catch (err) {
        dispatch(SET_ERROR(true))
        dispatch(SET_IS_SNACKBAR_OPEN(true))
        // dispatch(SET_SNACK_BAR_MESSAGE(err?.response?.data?.msg || "failed to fetch comments for this post"))
        setTimeout(() => {
          dispatch(SET_IS_SNACKBAR_OPEN(false))
        },5000)
      }
    };

    fecthCommentsForThisPost();
  }, []);

  return (
    <Box>
      <Snackbar
        open={actionIsSnackBarOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={actionErrorSelector ? "error" : "success"}>
          {actionErrorSelector}
        </Alert>
      </Snackbar>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "scroll",
            },
          }}
        />

        <SwipeableDrawer
          anchor="bottom"
          open={isCommentModalOpen}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Container>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                fontSize={"2rem"}
                variant="p"
                component={"p"}
                fontWeight={800}
                color={"GrayText"}
              >
                Responses: {comments.length}
              </Typography>
              <Button
                onClick={() => setIsCommentModalOpen(false)}
                variant="contained"
                color="inherit"
                startIcon={<CloseOutlined fontSize="large" />}
              ></Button>
            </Box>
            <Stack>
              <Box component={"form"} my={"1em"} onSubmit={handleCommentSubmit}>
                <TextField
                  sx={{ width: "60%" }}
                  variant="outlined"
                  multiline
                  placeholder={"write a comment ? ✍"}
                  label={"comment"}
                  onChange={handleCommentFieldChange}
                  name="content"
                ></TextField>
                <Box my={'1em'}>
                  <LoadingButton
                    loading={actionIsLoading}
                    type={"submit"}
                    variant="text"
                    color="inherit"
                    startIcon={<Send fontSize="medium" />}
                  >
                    Post
                  </LoadingButton>
                </Box>
              </Box>
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return <Comments comment={comment} key={comment.id} />;
                })
              ) : (
                <Typography
                  my={"2em"}
                  variant="p"
                  component={"p"}
                  fontSize={"1.5rem"}
                  fontWeight={"bold"}
                >
                  No Comments On This Post Yet
                </Typography>
              )}
            </Stack>
          </Container>
        </SwipeableDrawer>
      </Root>
    </Box>
  );
}


export default CommentModal;
