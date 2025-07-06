import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginThunk, refreshTokenThunk} from '../authThunks';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload?.user || null;
      })
      .addCase(loginThunk.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(refreshTokenThunk.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
