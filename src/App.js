import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";

import { Box } from "@mui/material";
import { LandingPage } from "./pages/landing/landingPage";
import { Auth } from "./pages/Auth/Auth";
import { Profile } from "./pages/profile/Profile";

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>

      </Routes>
    </Box>
  );
}

export default App;
