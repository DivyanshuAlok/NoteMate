// hooks/useLogin.ts
import {useMutation, useQueryClient} from '@tanstack/react-query';
import * as Keychain from 'react-native-keychain';
import {authApi} from '../api/auth';
import {useDispatch} from 'react-redux';
import {setAuth, setUser} from '../redux/slices/authSlice'; // a new reducer we'll define

export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const data = await authApi(email, password);

      // Secure token storage
      await Keychain.setGenericPassword('jwt', data.token);
      if (data.refreshToken) {
        await Keychain.setGenericPassword('refreshToken', data.refreshToken);
      }

      return data;
    },
    onSuccess: data => {
      dispatch(setAuth({token: data.token}));
      dispatch(setUser(data.user));
    },
  });
};
