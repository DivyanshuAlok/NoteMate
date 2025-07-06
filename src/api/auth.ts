import axios from 'axios';

const API_BASE_URL =
  //'https://bz4ri7ye58.execute-api.us-east-1.amazonaws.com/dev';
  'https://4740-49-207-233-243.ngrok-free.app/dev';

export const signUpApi = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, {
    email,
    password,
  });
  console.log(response);

  return response.data;
};

export const authApi = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth`, {
    email,
    password,
  });
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/refresh`, {
    refreshToken,
  });
  return response.data;
};
