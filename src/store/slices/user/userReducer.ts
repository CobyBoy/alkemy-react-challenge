import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as cacheService from '../../../services/cacheService';
import { UserAuthState } from '../../../shared/interfaces';

const initialState: UserAuthState = {
  authenticated: false,
  token: '',
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    authenticate(state, action: PayloadAction<UserAuthState>): void {
      state.authenticated = action.payload.authenticated,
      state.token = action.payload.token;
    },
    logout(state): void {
      cacheService.clearCache();
      state.authenticated = initialState.authenticated;
      state.token = initialState.token;
    },
  },
});

export const authenticateAction = authSlice.actions;
export default authSlice.reducer;
