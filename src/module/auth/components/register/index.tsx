import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, colors, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../../core/context/hooks";
import { registerAsync, logoutAsync } from "../../slice/auth.slice";
import { IAuthResponse } from "../../interface/auth-response.interface";
import { handleAPIErrorResponse } from "../../../../shared/utils/handle-api-error-response";
import { IHttpResponse } from "../../../../shared/interface/http-response.interface";
import "./index.scss";

type RegisterFormValues = {
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerMode: string;
};

const schema = yup
  .object({
    firstName: yup.string().required("Enter your first name"),
    lastName: yup.string(),
    phoneNumber: yup
      .string()
      .required("Enter your phone number")
      .matches(
        /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}))$/,
        "Enter a valid phone number"
      ),
    email: yup.string().email("Invalid email").required("Enter your email"),
    password: yup
      .string()
      .required("Enter your password")
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Enter confirm password")
      .oneOf([yup.ref("password")], "Passwords must match"),
    registerMode: yup.string().required("Register mode is Required"),
  })
  .required();

const Register = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({ resolver: yupResolver(schema) });

  const goToLoginClickedHandler = () => navigate("/auth");

  const onSubmitHandler = handleSubmit(async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...formData } = data;
    try {
      const response: IAuthResponse = await dispatch(
        registerAsync(formData)
      ).unwrap();
      if (response.isSuccess) {
        if (response?.message) {
          toast.success(response.message[0]);
        }
        logoutHandler();
      }
    } catch (error) {
      const errorResponse = error as unknown as IAuthResponse;
      handleAPIErrorResponse(errorResponse);
    }
  });

  const logoutHandler = async () => {
    try {
      const response: IHttpResponse = await dispatch(logoutAsync()).unwrap();
      if (response.isSuccess) {
        localStorage.clear();
        navigate("/auth");
      }
    } catch (error) {
      const errorResponse = error as unknown as IHttpResponse;
      handleAPIErrorResponse(errorResponse);
    }
  };

  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  React.useEffect(() => {
    setValue("registerMode", "company");
  }, []);

  return (
    <div className="register-container">
      <div className="left-side-container-sign-up" style={{ flexDirection: "column" }}>
        <Box>
          <Typography
            variant="h3"
            sx={{ color: colors.common.black, fontWeight: "bold" }}
          >
            Create New <br /> Account
          </Typography>
          <Typography sx={{ color: colors.common.black }}>
            Enter your details to create your account
          </Typography>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="right-side-container-sign-up">
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            noValidate
            className="sign-up-wrapper"
          >
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              autoComplete="firstName"
              autoFocus
              {...register("firstName")}
              className={`text-field Mui-focused ${
                errors.firstName ? "Mui-error" : ""
              }`}
            />
            {errors?.firstName && (
              <p style={{ color: colors.red[500], margin: "3px" }}>
                {errors.firstName.message}
              </p>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="lastName"
              {...register("lastName")}
              className="text-field Mui-focused"
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone"
              type="text"
              autoComplete="phone"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              {...register("phoneNumber")}
              onInput={handlePhoneInput}
              className={`text-field Mui-focused ${
                errors.phoneNumber ? "Mui-error" : ""
              }`}
            />
            {errors?.phoneNumber && (
              <p style={{ color: colors.red[500], margin: "3px" }}>
                {errors.phoneNumber.message}
              </p>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              {...register("email")}
              className={`text-field Mui-focused ${
                errors.email ? "Mui-error" : ""
              }`}
            />
            {errors?.email && (
              <p style={{ color: colors.red[500], margin: "3px" }}>
                {errors.email.message}
              </p>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="password"
              {...register("password")}
              className={`text-field Mui-focused ${
                errors.password ? "Mui-error" : ""
              }`}
            />
            {errors?.password && (
              <p style={{ color: colors.red[500], margin: "3px" }}>
                {errors.password.message}
              </p>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="confirmPassword"
              {...register("confirmPassword")}
              className={`text-field Mui-focused ${
                errors.confirmPassword ? "Mui-error" : ""
              }`}
            />
            {errors?.confirmPassword && (
              <p style={{ color: colors.red[500], margin: "3px" }}>
                {errors.confirmPassword.message}
              </p>
            )}
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              fullWidth
              loading={authState.isLoading}
              loadingIndicator="Signing..."
              variant="contained"
              className="sign-up-btn"
            >
              <span>Create Account</span>
            </LoadingButton>
            <div style={{ textAlign: "center" }}>
              <Typography
                className="link-navigation"
                onClick={goToLoginClickedHandler}
              >
                Already have an account? Log In
              </Typography>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Register;
