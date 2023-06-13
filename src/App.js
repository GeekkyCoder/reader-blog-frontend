import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";

import { Box } from "@mui/material";
import { LandingPage } from "./pages/landing/landingPage";

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route index element={<LandingPage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
