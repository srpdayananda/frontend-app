import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { UserApi } from '../api/user.api';
import { TGetUserInputProps } from '../types/user-input-props.type';
import { TPaginationInputProps } from '../../../shared/types/pagination-input-props.type';

const userApi = new UserApi();

export const getUsersAsync = createAsyncThunk(
  'user/getUser',
  async (props: TPaginationInputProps, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(props);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const getSingleUserAsync = createAsyncThunk(
  'user/getSingleUser',
  async (props: TGetUserInputProps, { rejectWithValue }) => {
    try {
      const response = await userApi.getSingleUser(props);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const getUserPermissionAsync = createAsyncThunk(
  'user/getUserPermission',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserPermission();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const generatePinAsync = createAsyncThunk(
  'user/generatePin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.generatePin();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const createUserAsync = createAsyncThunk(
  'user/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await userApi.createUser(formData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

export const updateUserAsync = createAsyncThunk(
  'user/update',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser(formData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);

//new slice base on your users

export const getAllUsersAsync = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getAllUsers();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  },
);