import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  token: ''
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    authenticate(state, action) {
      console.log('stateAuthslice', state, 'actionAuthlice', action);
      (state.authenticated = action.payload.authenticated),
      (state.token = action.payload.token);
    },
  },
});

export const authenticateAction = authSlice.actions;
export default authSlice.reducer;
