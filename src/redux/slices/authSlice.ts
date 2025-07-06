// redux/slices/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
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
    setAuth: (
      state,
      action: PayloadAction<{token: string; user: string | null}>,
    ) => {
      state.isAuthenticated = true;
      state.jwt = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.jwt = null;
      state.user = null;
    },
  },
});

export const {setAuth, logout} = authSlice.actions;
export default authSlice.reducer;
