import * as Keychain from 'react-native-keychain';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi, refreshTokenApi} from '../api/auth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const data = await authApi(email, password);
      // Store tokens securely
      await Keychain.setGenericPassword('jwt', data.token);
      if (data.refreshToken) {
        await Keychain.setGenericPassword('refreshToken', data.refreshToken);
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, {rejectWithValue}) => {
    try {
      const creds = await Keychain.getGenericPassword();
      if (!creds || !creds.password) throw new Error('No refresh token found');
      const refreshToken = creds.password;
      const data = await refreshTokenApi(refreshToken);
      await Keychain.setGenericPassword('jwt', data.token);
      if (data.refreshToken) {
        await Keychain.setGenericPassword('refreshToken', data.refreshToken);
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);
