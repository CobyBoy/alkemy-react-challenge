import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const mealSlice = createSlice({
  initialState,
  name: 'meal',
  reducers: {
    setMealsData(state, action) {
      console.log('setMealsData state', state, 'action', action);
      state.data = action.payload;
    },
  },
});

export const getComplexMealsAction = mealSlice.actions;
export default mealSlice.reducer;
