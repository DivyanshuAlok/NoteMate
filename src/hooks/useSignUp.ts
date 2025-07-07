import {useMutation} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {signUpApi} from '../api/auth';

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        throw new Error('No internet connection');
      }
      return signUpApi(name, email, password);
    },
    onError: (error: any) => {
      console.log('Sign Up error:', error.message);
      // Optionally: show error toast or update some error state here
    },
  });
};
