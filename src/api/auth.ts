import api from './axios';

export const signUpApi = async (email: string, password: string) => {
  const response = await api.post('/signup', {email, password});
  return response.data;
};

export const authApi = async (email: string, password: string) => {
  const response = await api.post('/auth', {email, password});
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await api.post('/refresh', {refreshToken});
  return response.data;
};
