// api/axios.ts
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {store} from '../redux/store';
import {setAuth, logout} from '../redux/slices/authSlice';
import {refreshTokenApi} from './auth';

const api = axios.create({
  baseURL: 'https://4740-49-207-233-243.ngrok-free.app/dev',
});

api.interceptors.request.use(async config => {
  const creds = await Keychain.getGenericPassword();
  if (creds) {
    config.headers.Authorization = `Bearer ${creds.password}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const creds = await Keychain.getGenericPassword();
        if (!creds) {
          throw new Error('No credentials found');
        }
        const refreshToken = creds?.password;
        if (!refreshToken) throw new Error('No refresh token');

        const data = await refreshTokenApi(refreshToken);
        await Keychain.setGenericPassword('jwt', data.token);

        store.dispatch(setAuth({token: data.token}));

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (e) {
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
