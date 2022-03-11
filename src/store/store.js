import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealReducer from './mealReducer';

const reducers = combineReducers({
  user: userReducer,
  meals: mealReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: { persistedReducer },
});
let persistor = persistStore(store);

export { store, persistor };
