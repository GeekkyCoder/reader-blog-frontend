import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./App.css"

import { Box } from "@mui/material";
import { LandingPage } from "./pages/landing/landingPage";
import { Auth } from "./pages/Auth/Auth";
import { Profile } from "./pages/profile/Profile";
import { Content } from "./components/Content/Content";
import { Article } from "./pages/Articles/Artticles";

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/content" element={<Content/>}></Route>
        <Route path="/content/*"> 
          <Route index element={<Article/>}></Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
