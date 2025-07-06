import {useMutation} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {signUpApi} from '../api/auth';

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        throw new Error('No internet connection');
      }
      return signUpApi(email, password);
    },
  });
};
