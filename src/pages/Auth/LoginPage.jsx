import { useState } from "react";

import { FormContainer, InputField } from "./AuthStyles";

import { Box, Snackbar, InputAdornment, Typography, Button, Stack, Alert } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import {
  Login,
  Visibility,
  VisibilityOff,
  EmailOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";


import {
  userErrorSelector,
  userLoadingSelector,
} from "../../store/user/userSelector";

import axios from "axios";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "../../store/user/user.actions";


const defaultFormValues = {
  email: "",
  password: "",
};

export const LoginPage = ({ handleShowAuth,setShowAuthModal }) => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isLoading = useSelector(userLoadingSelector);
  const error = useSelector(userErrorSelector);

  
  const dispatch = useDispatch();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      email: formFields.email,
      password: formFields.password,
    };

    dispatch(FETCH_USER_START());
    try {
      const {data} = await axios.post('http://localhost:8000/api/v1/auth/login',userObj,{
        withCredentials:true
      })
      dispatch(FETCH_USER_SUCCESS(data));
      setSnackbarMessage("logged in successfully ✔");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowAuthModal(false)
        setShowSnackbar(false);
      }, 2000);
    } catch (err) {
      console.log(err)
      dispatch(FETCH_USER_FAILED(err?.response?.data?.msg || 'failed to login'));
      setSnackbarMessage(err?.response?.data?.msg || 'failed to login');
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
    }
  };

  const handleFormFieldChanges = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handlePasswordShow = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { email, password } = formFields;


  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <FormContainer component={"form"} onSubmit={handleLoginFormSubmit}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
      >
        <Alert security={error ? "error" : 'success'}>{snackbarMessage}</Alert>
        </Snackbar>

      <Typography
        variant="h3"
        component={"h5"}
        textAlign={"center"}
        color={"GrayText"}
      >
        READER
      </Typography>
      <Typography
        component={"h3"}
        variant="p"
        textAlign={"center"}
        color={"GrayText"}
        mt={"1em"}
      >
        LOGIN
      </Typography>

      <Box>
        <InputField
          required
          label="Email"
          placeholder=" Email"
          onChange={handleFormFieldChanges}
          value={email}
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
          //   helperText="please provide a valid email"
        />
      </Box>

      <Box>
        <InputField
          required
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleFormFieldChanges}
          value={password}
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility onClick={handlePasswordShow} />
                ) : (
                  <VisibilityOff onClick={handlePasswordShow} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <LoadingButton 
        
          size="large"
          startIcon={<Login />}
          sx={{
            display: "flex",
            textAlign: "center",
            flexDirection: "row",
            width: "200px",
            alignItems: "center",
            margin: "1em auto",
            marginTop:"2em"
          }}
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
        >
          LOGIN
        </LoadingButton>
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography m={'1em'} fontWeight={600} fontFamily={'cursive'}>
        Dont Have An Account 👇 ?
        </Typography>
        <Button
        onClick={handleShowAuth}
         sx={{
          display: { xs: "flex" },
          width: { xs: "200px" },
          margin: { xs: "auto" },
        }}
        size="large"
        variant="outlined"
        startIcon={<Login/>}
        >
          Signup
        </Button>
        </Stack>
      </Box>

    </FormContainer>
    </Box>
  );
};
