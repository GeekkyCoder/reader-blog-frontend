import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import { LogoText, SignUpButton, StyledToolbar, theme } from "./Header.styles";

import { ThemeProvider as ButtonThemeProvider } from "@mui/material";
import {
  loggedInUserSelector,
  userSelectorReducer,
} from "../../store/user/userSelector";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  FETCH_LOGGEDINUSER_FAILED,
  FETCH_LOGGEDINUSER_LOGOUT,
  FETCH_LOGGEDINUSER_START,
  FETCH_LOGGEDINUSER_SUCCESS,
} from "../../store/user/user.actions";
import { SET_LOGGED_IN_USER_LOGOUT, SET_USER_LOGOUT } from "../../store/user/user.actionTypes";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector(userSelectorReducer);
  const loggedInUser = useSelector(loggedInUserSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClose = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (e) => {
    const redirectPath = e.target.textContent;
    if (redirectPath === "Logout") {
      dispatch(SET_USER_LOGOUT())
      dispatch(SET_LOGGED_IN_USER_LOGOUT())
    };
    navigate(`${redirectPath.toLowerCase()}`);
  };

  const handleSignUpClick = () => {
    navigate("/auth");
  };

  const menuItems = ["Profile", "Logout"];

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(FETCH_LOGGEDINUSER_START());
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/auth/currentUser",
          {
            headers: {
              Authorization: `Bearer ${user.currentUser.token}`,
            },
          }
        );
        console.log(data);
        dispatch(FETCH_LOGGEDINUSER_SUCCESS(data));
      } catch (err) {
        dispatch(FETCH_LOGGEDINUSER_FAILED(err));
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LogoText
            variant="h4"
            color={"paleturquoise"}
            component={"a"}
            href="/"
          >
            READER
          </LogoText>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: { sx: "50%", sm: user.currentUser ? "18%" : "30%" },
            fontWeight: "bold",
          }}
        >
          <Button
            sx={{
              color: "white",
              "&:hover": {
                color: "gray",
                fontWeight: "bold",
              },
            }}
            startIcon={
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Write"
              >
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                  stroke="currentColor"
                ></path>
              </svg>
            }
            variant="text"
          >
            Write
          </Button>

          {!user.currentUser && (
            <ButtonThemeProvider theme={theme}>
              <SignUpButton
                sx={{ display: { xs: "none", sm: "block" } }}
                disableElevation
                variant="contained"
                color="primary"
                onClick={handleSignUpClick}
              >
                Sign Up
              </SignUpButton>
            </ButtonThemeProvider>
          )}

          <Tooltip>
            <IconButton
              onClick={handleMenuClose}
              sx={{ marginLeft: { xs: ".6em", sm: 0 } }}
            >
              <Avatar
                src={loggedInUser.user.profileImage}
                alt="Remy Sharp"
              ></Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClick}
          >
            {menuItems.map((menuItem) => (
              <MenuItem key={menuItem} onClick={handleMenuClose}>
                {menuItem}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};
