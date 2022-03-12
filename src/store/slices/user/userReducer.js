import { createSlice } from '@reduxjs/toolkit';
import * as cacheService from '../../../services/cacheService';

const initialState = {
  authenticated: false,
  token: '',
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    authenticate(state, action) {
      (state.authenticated = action.payload.authenticated),
      (state.token = action.payload.token);
    },
    logout(state) {
      cacheService.clearCache();
      state.authenticated = initialState.authenticated;
      state.token = initialState.token;
    },
  },
});

export const authenticateAction = authSlice.actions;
export default authSlice.reducer;
