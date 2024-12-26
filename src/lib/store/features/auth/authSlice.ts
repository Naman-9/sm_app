import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type AuthState = {
  user: null | { id: string; name: string };
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string }>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearCredentials(state) {
      state.user = null;
      state.token = '';
    },
  },
});

export const { setToken, setUser, clearCredentials } = authSlice.actions;

export const selectCurentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
