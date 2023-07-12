import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";
import Articles from "../../pages/Articles/Articles";
import { useDispatch, useSelector } from "react-redux";
import { allUserSelector } from "../../store/user/userSelector";
import axios from "axios";
import { FETCH_USER_FOLLOWERS } from "../../store/user/user.actions";
import {
  SET_ERROR,
  SET_IS_LOADING,
  SET_IS_SNACKBAR_OPEN,
  SET_SNACK_BAR_MESSAGE,
} from "../../store/actions/actions.actions";
import {
  errorActionSelector,
  isSnackBarOpenActionSelector,
  snackbarMessageActionSelector,
  loadingActionSelector,
} from "../../store/actions/actionSelector";

import UserList from "./UserList";
// import { useEffect } from "react";

const Content = () => {
  const users = useSelector(allUserSelector);

  const dispatch = useDispatch();

  const errorAction = useSelector(errorActionSelector);
  const snackBarMessage = useSelector(snackbarMessageActionSelector);
  const snackBarOpen = useSelector(isSnackBarOpenActionSelector);
  const loadingAction = useSelector(loadingActionSelector);

  const addToFollowing = async (userToFollowId) => {
    dispatch(SET_IS_LOADING());
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/followers",
        { followerId: userToFollowId },
        {
          withCredentials: true,
        }
      );
      dispatch(FETCH_USER_FOLLOWERS(data?.users));
      dispatch(
        SET_SNACK_BAR_MESSAGE(`you are now following ${data?.follower}` || "✔")
      );
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 4000);
    } catch (err) {
      dispatch(SET_ERROR());
      dispatch(
        SET_SNACK_BAR_MESSAGE(err?.response?.msg || "❌ failed to follow")
      );
      dispatch(SET_IS_SNACKBAR_OPEN(true));
      setTimeout(() => {
        dispatch(SET_IS_SNACKBAR_OPEN(false));
      }, 4000);
    }
  };

  console.log(`users: ${typeof(users)}`)

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={errorAction ? "error" : "success"}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box flex={{ xs: 10, sm: 5 }}>
          <Articles />
        </Box>

        <Box
          position={"relative"}
          overflow={"hidden"}
          height={"100vh"}
          flex={2}
          display={{ xs: "none", sm: "block" }}
          bgcolor={"ghostwhite"}
        >
          <Box
            height={"100%"}
            position={"absolute"}
            top={"0px"}
            bottom={"0px"}
            right={"0px"}
            p={"1em"}
            overflow={"auto"}
            className="scrollbar-hidden"
          >
            { users.length > 0 && (
              <Typography
                fontWeight={800}
                component={"p"}
                variant="p"
                fontSize={"1.6rem"}
              >
                Who to Follow 👇
              </Typography>
            )}
            {users &&
              users.map((user) => {
                return (
                  <UserList
                    key={user._id}
                    user={user}
                    addToFollowing={addToFollowing}
                    loadingAction={loadingAction}
                  />
                );
              })}
              {!users.length && <Typography component={'p'} fontWeight={800} variant="p">No one to follow for now</Typography>}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Content;
