import { useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
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
import { CloseOutlined, Send } from "@mui/icons-material";
import Comments from "./Comments";

import axios from "axios";
import { LoadingButton } from "@mui/lab";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

function CommentModal({
  isCommentModalOpen,
  setIsCommentModalOpen,
  comments,
  blogId,
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  //   console.log(comments);

  const handleCommentFieldChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const commentObj = {
      content,
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `/api/v1/comments/createComment?postId=${blogId} `,
        commentObj
      );
      setIsLoading(false);
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      });
      setError(false);
    } catch (err) {
      setIsSnackBarOpen(true);
      setError(false);
      setIsLoading(false);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      });
    }
  };

  return (
    <Box>
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert severity={error ? "error" : "success"}>
          {error ? "❌" : "✔"}
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
          // container={container}
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
                variant="text"
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
                <Box>
                  <LoadingButton
                    loading={isLoading}
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
          {/*Content*/}
        </SwipeableDrawer>
      </Root>
    </Box>
  );
}

// CommentModal.propTypes = {
//   window: PropTypes.func,
// };

export default CommentModal;
