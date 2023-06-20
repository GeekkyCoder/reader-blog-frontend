import {
  Box,
  InputAdornment,
  Snackbar,
  Fade,
  Typography,
  Button,
  Stack
} from "@mui/material";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import {
  AccountCircle,
  EmailOutlined,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { FormContainer, InputField } from "./AuthStyles";
import { useState } from "react";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Signup = ({handleShowAuth}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackbarMessage,setSnackbarMessage] = useState('')
  const [error,setError] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const { name, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // add this user to database
    const userObj = {
      name,
      email,
      password,
      confirmPassword,
    };

    if (
      !userObj.name ||
      !userObj.email ||
      !userObj.password ||
      !userObj.confirmPassword
    ) {
      return;
    }

    setIsLoading(true)
    try {
      const { data } = await axios.post(
        "/api/v1/auth/register",
        userObj,{
          withCredentials:true
        }
      );
     
      setFormFields({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsSnackBarOpen(true);
      setSnackbarMessage(' ✔ Success! Please check your email to verify account')
      setTimeout(() => {
        handleShowAuth()
        setIsSnackBarOpen(false)
      },3000)
      setError(false)
      setIsLoading(false)
    } catch (err) {
      setError(true)
      setIsLoading(false)
      setSnackbarMessage(err?.response?.data?.msg || "failed to register")
      setIsSnackBarOpen(true);
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000);
    }
  };


  const handlePasswordShow = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFieldsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <FormContainer component={"form"} onSubmit={handleFormSubmit}>
      <Snackbar
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        open={isSnackBarOpen}
      />
      <Box>
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
        SIGNUP
      </Typography>
        <InputField
          variant="outlined"
          label="Name"
          required
          placeholder="Username"
          onChange={handleFieldsChange}
          value={name}
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <InputField
          required
          label="Email"
          placeholder=" Email"
          onChange={handleFieldsChange}
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
          onChange={handleFieldsChange}
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
        <InputField
          required
          label="Confirm-Password"
          placeholder="Confirm Password"
          onChange={handleFieldsChange}
          value={confirmPassword}
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
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
          sx={{
            display: { sm: "block" },
            width: { sm: "200px" },
            margin: { sm: "auto" },
            marginTop: { sm: "2em" },
          }}
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </LoadingButton>
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography m={'1em'}>
          Already Have An Account ?
        </Typography>
        <Button 
        onClick={handleShowAuth}
         sx={{
          display: { sm: "flex" },
          width: { sm: "200px" },
          margin: { sm: "auto" },
        }}
        size="large"
        variant="outlined"
        startIcon={<Login/>}
        >
          Login
        </Button>
        </Stack>
      </Box>
    </FormContainer>
  );
};
