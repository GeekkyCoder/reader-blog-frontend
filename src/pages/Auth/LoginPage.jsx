import { useState } from "react";

import { FormContainer, InputField } from "./AuthStyles";

import { Fade, Box, Snackbar, InputAdornment, Typography, Button, Stack } from "@mui/material";

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
import { useNavigate } from "react-router-dom";

const defaultFormValues = {
  email: "",
  password: "",
};

export const LoginPage = ({ handleShowAuth }) => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const error = useSelector(userErrorSelector);
  const isLoading = useSelector(userLoadingSelector);
  
 const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      email: formFields.email,
      password: formFields.password,
    };

    dispatch(FETCH_USER_START());
    try {
      const { data } = await axios.post(
        "/api/v1/auth/login",
        userObj
      );
      dispatch(FETCH_USER_SUCCESS(data));
      setSnackbarMessage("logged in successfully ✔");
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
      setTimeout(() => {
        navigate("/")
      },3000)
    } catch (err) {
      dispatch(FETCH_USER_FAILED(err));
      setSnackbarMessage(err.response.data.msg);
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
    <FormContainer component={"form"} onSubmit={handleLoginFormSubmit}>
      <Snackbar
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        open={showSnackbar}
      />

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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        open={false}
        // message={error ? "something went wrong" : "success"}
      />

      <Box>
        <InputField
          error={error ? true : false}
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
          error={error ? true : false}
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
        <Typography m={'1em'}>
        Dont Have An Account ?
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
          Signup
        </Button>
        </Stack>
      </Box>

    </FormContainer>
  );
};
