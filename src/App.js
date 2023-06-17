// import dotenv from 'dotenv';
// dotenv.config();

import { lazy, Suspense, useEffect } from "react";

import LinearPorgressLine  from "./components/LinearProgress/LinearProgress.jsx"

import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Box } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USER_FAILED, FETCH_USER_START, FETCH_USER_SUCCESS } from "./store/user/user.actions.js";
import { currentUserSelector } from "./store/user/userSelector.js";

const Header = lazy(() => import("./components/Header/Header.jsx"));
const LandingPage = lazy(() => import("./pages/landing/landingPage.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Content = lazy(() => import("./components/Content/Content.jsx"));
const Article = lazy(() => import("./pages/Articles/Articles.jsx"));
const Auth = lazy(() => import("./pages/Auth/Auth.jsx"));





function App() {

  const currentUser = useSelector(currentUserSelector)

  const dispatch = useDispatch()

  const fetchCurrentUser = async ()=> {
    dispatch(FETCH_USER_START())
    try{
      const {data} = await axios.get("/api/v1/auth/currentUser")
      dispatch(FETCH_USER_SUCCESS(data))
    }catch(err){
      dispatch(FETCH_USER_FAILED(err))
    }
  }
  
  useEffect(() => {
    fetchCurrentUser()
  },[])


  return (
    <Suspense fallback={<LinearPorgressLine/>}>
      <Box>
        <Header />
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/content/*">
            <Route index element={<Content />}></Route>
          </Route>
        </Routes>
      </Box>
    </Suspense>
  );
}

export default App;
