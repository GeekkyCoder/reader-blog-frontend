import { Box, Dialog, TextField, styled } from "@mui/material";
import ScattereredForceFlies from "../../Assets/scattered-forcefields.png";

export const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url(${ScattereredForceFlies})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  padding: 0,
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: "1em",
  width:"500px"
}));

export const InputField = styled(TextField)(({ theme }) => ({
  marginTop: "2em",
  width: "100%",
  height:"50px"
}));
