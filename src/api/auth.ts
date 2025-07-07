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
  try {
    const response = await api.post('/auth', {email, password});
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('Server responded:', error.response.data);
      throw new Error(error.response.data?.error || 'Login failed');
    } else if (error.request) {
      console.log('No response:', error.request);
      throw new Error('No response from server');
    } else {
      console.log('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await api.post('/refresh', {refreshToken});
  return response.data;
};
