import api from './axios';

export const signUpApi = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await api.post('/signup', {name, email, password});
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
