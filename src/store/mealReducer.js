import { createSlice, current } from '@reduxjs/toolkit';

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
    addMeal(state, action) {
      console.log('adding meal', state, action);
      state.data.push(action.payload);
    },
    deleteMealFromMenu(state, action) {
      console.log('deleteMeal', state.data, action);
      state.data = state.data.filter((currentMeal) => currentMeal.id !== action.payload);
    },
    clearOnLogOut(state) {
      state.data = [];
      console.log('clearOnLogOut',current(state));
    }
  },
});

export const getComplexMealsAction = mealSlice.actions;
export default mealSlice.reducer;
