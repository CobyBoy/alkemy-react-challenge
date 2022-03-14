import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealState } from '../../../shared/interfaces';

const initialState: MealState = {
  data: [],
};


const mealSlice = createSlice({
  initialState,
  name: 'meal',
  reducers: {
    setMealsData(state, action: PayloadAction<Meal[]>): void {
      state.data = action.payload;
    },
    addMeal(state, action: PayloadAction<Meal>): void {
      state.data.push(action.payload);
    },
    deleteMealFromMenu(state, action: PayloadAction<number>): void {
      state.data = state.data.filter(
        (currentMeal) => currentMeal.id !== action.payload
      );
    },
    clearOnLogOut(state): void {
      state.data = [];
    },
  },
});

export const getComplexMealsAction = mealSlice.actions;
export default mealSlice.reducer;
