import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {  Box, colors, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';

import { loginAsync } from '../../slice/auth.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/context/hooks';
import { IAuthResponse } from '../../interface/auth-response.interface';
import { EUserRole } from '../../../../shared/enums/user-role.enum';
import { handleAPIErrorResponse } from '../../../../shared/utils/handle-api-error-response';
import './index.scss';

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required('Enter your email'),
    password: yup.string().required('Enter your password'),
  })
  .required();

const Login = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });

  const goToRegisterClickedHandler = () => navigate('register');

  const onSubmitHandler = handleSubmit(async (data) => {
    try {
      const response: IAuthResponse = await dispatch(loginAsync(data)).unwrap();
      if (response.isSuccess) {
        if (response?.message) {
          toast.success(response.message[0]);
        }
        const roles = response?.data?.roles;
        if (roles?.length && roles.includes(EUserRole.CompanyAdmin)) {
          navigate('/user');
          return;
        }
        navigate('/job');
      }
    } catch (error) {
      const errorResponse = error as unknown as IAuthResponse;
      handleAPIErrorResponse(errorResponse);
    }
  });

  return (
    <div className="login-container">
      <div className="left-side-container-login" style={{ flexDirection: "column" }}>
        <Box>
          <Typography
            variant="h3"
            sx={{ color: colors.common.black, fontWeight: 'bold' }}
          >
            Sign in to <br /> Your Account
          </Typography>
          <Typography sx={{ color: colors.common.black }}>
            Enter your email & password to login
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
        <Box className="right-side-container-login">
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            noValidate
            className="login-wrapper"
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              className={`text-field Mui-focused ${errors.email ? 'Mui-error': ''}`}
            />
            {errors?.email && (
              <p style={{ color: colors.red[500], margin: '3px' }}>
                {errors.email.message}
              </p>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              className={`text-field Mui-focused ${errors.password ? 'Mui-error': ''}`}
            />
            {errors?.password && (
              <p style={{ color: colors.red[500], margin: '3px' }}>
                {errors.password.message}
              </p>
            )}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Typography
                className="link-navigation"
              >
                Forgot password?
              </Typography>
            </div>
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              fullWidth
              loading={authState.isLoading}
              loadingIndicator="Signing..."
              variant="contained"
              className="login-btn"
            >
              <span>Log in</span>
            </LoadingButton>
            <div style={{ textAlign: 'center' }}>
              <Typography
                className="link-navigation"
                onClick={goToRegisterClickedHandler}
              >
                Don't have an account? Sign Up
              </Typography>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Login;
