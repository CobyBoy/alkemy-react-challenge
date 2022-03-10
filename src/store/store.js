import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealReducer from './mealReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  user: userReducer,
  meals: mealReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'meals'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: { persistedReducer },
});
export default store;
