import {
  Box,
  InputAdornment,
  Button,
  Typography,
  Snackbar,
  Fade,
} from "@mui/material";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import {
  AccountCircle,
  Login,
  EmailOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { FormContainer, InputField } from "./AuthStyles";
import { useState } from "react";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "../../store/user/user.actions";
import {
  userErrorSelector,
  userLoadingSelector,
  userSelectorReducer,
} from "../../store/user/userSelector";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Signup = ({}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const { name, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(userSelectorReducer);
  const error = useSelector(userErrorSelector);
  const loading = useSelector(userLoadingSelector);

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

    dispatch(FETCH_USER_START());

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        userObj
      );
      dispatch(FETCH_USER_SUCCESS(data));
      setFormFields({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsSnackBarOpen(true);
    } catch (err) {
      dispatch(FETCH_USER_FAILED(err.response.data));
      setIsSnackBarOpen(false);
    } finally {
      setTimeout(() => {
        setIsSnackBarOpen(false);
        navigate("/");
      }, 4000);
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        open={isSnackBarOpen}
        message={error ? "something went wrong" : "success"}
      />
      <Box>
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
          error={false}
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
          loading={loading}
          variant="contained"
          color="primary"
        >
          Submit
        </LoadingButton>
      </Box>

      <Box>
        <Typography
          variant="h6"
          component={"h5"}
          color={"GrayText"}
          sx={{ textAlign: "center", margin: ".7em 0", fontWeight: "bold" }}
        >
          OR{" "}
        </Typography>
        <Button
          startIcon={<Login />}
          variant="outlined"
          color="secondary"
          //   onClick={() => handleClose("login")}
          //   sx={{ display: "block", margin: "auto", width: "200px" }}
          sx={{
            display: "flex",
            textAlign: "center",
            flexDirection: "row",
            width: "200px",
            margin: "auto",
            alignItems: "center",
          }}
        >
          Login
        </Button>
      </Box>
    </FormContainer>
  );
};
