// import dotenv from 'dotenv';
// dotenv.config();

import { lazy, Suspense, useEffect } from "react";

import LinearPorgressLine from "./components/LinearProgress/LinearProgress.jsx";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Box } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "./store/user/user.actions.js";
import { userFollowerSelector } from "./store/user/userSelector.js";
import Profile from "./pages/profile/Profile.jsx";

const Header = lazy(() => import("./components/Header/Header.jsx"));
const LandingPage = lazy(() => import("./pages/landing/landingPage.jsx"));
const ProfileSettings = lazy(() => import("./pages/profile/ProfileSettings.jsx"));
const Content = lazy(() => import("./components/Content/Content.jsx"));
const SingleArticle = lazy(() => import("./pages/Articles/SingleArticle.jsx"));
const UserPost = lazy(() => import("./pages/Articles/UserPost.jsx"));
const VerifyEmail = lazy(() => import("./pages/Auth/VerifyEmail.jsx"));

function App() {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    dispatch(FETCH_USER_START());
    try {
      const { data } = await axios.get("https://reader-blogging-web.onrender.com/api/v1/auth/currentUser",{
        withCredentials:true
      });
      dispatch(FETCH_USER_SUCCESS(data));
    } catch (err) {
      dispatch(FETCH_USER_FAILED(err));
    }
  };


  useEffect(() => {
    fetchCurrentUser();
  }, []);


  return (
    <Suspense fallback={<LinearPorgressLine />}>
      <Box sx={{bgcolor:"ghostwhite"}}>
        <Header />
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/user/verify-email" element={<VerifyEmail />}>
            {" "}
          </Route>
          <Route path="/profile/settings" element={<ProfileSettings />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path="/content">
            <Route index element={<Content />}></Route>
            <Route path="blog/:blogId" element={<SingleArticle />}></Route>
            <Route path="user/blogs" element={<UserPost />}></Route>
          </Route>
        </Routes>
      </Box>
    </Suspense>
  );
}

export default App;
