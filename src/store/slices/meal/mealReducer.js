import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const mealSlice = createSlice({
  initialState,
  name: 'meal',
  reducers: {
    setMealsData(state, action) {
      state.data = action.payload;
    },
    addMeal(state, action) {
      state.data.push(action.payload);
    },
    deleteMealFromMenu(state, action) {
      state.data = state.data.filter((currentMeal) => currentMeal.id !== action.payload);
    },
    clearOnLogOut(state) {
      state.data = [];
    }
  },
});

export const getComplexMealsAction = mealSlice.actions;
export default mealSlice.reducer;
