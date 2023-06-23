import { Box, Dialog, TextField, styled } from "@mui/material";

export const AuthContainer = styled(Box)(({ theme }) => ({
}));

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  padding: 0,
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: "1em",
  width:"500px",
}));

export const InputField = styled(TextField)(({ theme }) => ({
  marginTop: "2em",
  width: "100%",
  height:"50px"
}));
