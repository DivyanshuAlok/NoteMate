// redux/slices/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface USER {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: USER | null;
  jwt: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  jwt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{token: string}>) => {
      state.isAuthenticated = true;
      state.jwt = action.payload.token;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.jwt = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<USER | null>) => {
      state.user = action.payload;
    },
  },
});

export const {setAuth, logout, setUser} = authSlice.actions;
export default authSlice.reducer;
