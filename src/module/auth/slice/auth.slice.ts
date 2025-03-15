import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthApi } from '../api/auth.api';
import { AUTH_USER } from '../../../shared/constants/auth';
import { RegisterUserInputProps } from '../types/register-user-input-props.type';
import { LoginUserInputProps } from '../types/login-user-input-props.type';
import { IAuthState } from '../interface/auth-state.interface';

const authApi = new AuthApi();

const initialState: IAuthState = {
  authUser: JSON.parse(localStorage.getItem(AUTH_USER)!),
  isLoading: false,
};

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (props: RegisterUserInputProps, { rejectWithValue }) => {
    try {
      const response = await authApi.register(props);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (props: LoginUserInputProps, { rejectWithValue }) => {
    try {
      const response = await authApi.login(props);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(registerAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registerAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.authUser = payload.data;
      localStorage.setItem(AUTH_USER, JSON.stringify(payload.data));
    });

    builder.addCase(registerAsync.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.authUser = payload.data;
      localStorage.setItem(AUTH_USER, JSON.stringify(payload.data));
    });

    builder.addCase(loginAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
