import {createSlice} from '@reduxjs/toolkit';

const initialState = { authenticated: false, token: '' };

const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    authenticate(state, action) {
      console.log('stateuserslice', state, 'actionuserslice', action);
      state.authenticated = action.payload.authenticated,
      state.token = action.payload.token;
    }
  }
});
export const authenticateAction = userSlice.actions;
export default userSlice.reducer;