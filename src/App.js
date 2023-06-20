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
import { currentUserSelector } from "./store/user/userSelector.js";
import SingleArticle from "./pages/Articles/SingleArticle.jsx";
import VerifyPage from "./pages/Auth/VerifyEmail.jsx";

const Header = lazy(() => import("./components/Header/Header.jsx"));
const LandingPage = lazy(() => import("./pages/landing/landingPage.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Content = lazy(() => import("./components/Content/Content.jsx"));
const Auth = lazy(() => import("./pages/Auth/Auth.jsx"));

function App() {

  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    dispatch(FETCH_USER_START());
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/currentUser",
        {
          withCredentials: true,
        }
      );
      dispatch(FETCH_USER_SUCCESS(data));
    } catch (err) {
      console.log(err);
      dispatch(FETCH_USER_FAILED(err));
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Suspense fallback={<LinearPorgressLine />}>
      <Box>
        <Header />
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/user/verify-email" element={<VerifyPage />}> </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/content/*">
            <Route index element={<Content />}></Route>
            <Route path="blog/:blogId" element={<SingleArticle />}></Route>
          </Route>
        </Routes>
      </Box>
    </Suspense>
  );
}

export default App;
