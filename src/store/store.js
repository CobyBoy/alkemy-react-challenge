import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import mealReducer from './mealReducer';

const store = configureStore({ reducer: { user: userReducer, meal: mealReducer } });
export default store;