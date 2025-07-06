import {Note} from '../redux/slices/noteSlice';

export type AppDrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type AppStackParamList = {
  MainDrawer: undefined; // The drawer navigator
  EditNote: {note: Note};
};
