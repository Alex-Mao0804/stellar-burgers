import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {ingredientsReducer}  from '../slices/ingredientsSlice';
import {addIngredientsReducer}  from '../slices/addIngredientsSlice';
import {feedSliceReducer}  from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({ 
  ingredients: ingredientsReducer,
  addIngredients: addIngredientsReducer,
  feeds: feedSliceReducer,
  user: userReducer,

  }); // Заменить на импорт настоящего редьюсера. Например: const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
