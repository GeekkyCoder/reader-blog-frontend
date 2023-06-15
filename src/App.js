import { lazy, Suspense } from "react";

import LinearPorgressLine  from "./components/LinearProgress/LinearProgress.jsx"

import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Box } from "@mui/material";

const Header = lazy(() => import("./components/Header/Header.jsx"));
const LandingPage = lazy(() => import("./pages/landing/landingPage.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Content = lazy(() => import("./components/Content/Content.jsx"));
const Article = lazy(() => import("./pages/Articles/Articles.jsx"));
const Auth = lazy(() => import("./pages/Auth/Auth.jsx"));




function App() {
  return (
    <Suspense fallback={<LinearPorgressLine/>}>
      <Box>
        <Header />
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/content" element={<Content />}></Route>
          <Route path="/content/*">
            <Route index element={<Article />}></Route>
          </Route>
        </Routes>
      </Box>
    </Suspense>
  );
}

export default App;
