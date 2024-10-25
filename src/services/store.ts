import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { burgerIngredientsReducer } from '../slices/burgerIngredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedSliceReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { orderDetailsReducer } from '../slices/orderDetailsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  BURGER_CONSTRUCTOR_SLICE_NAME,
  BURGER_INGREDIENTS_SLICE_NAME,
  FEEDS_SLICE_NAME,
  ORDER_DETAILS_SLICE_NAME,
  USER_SLICE_NAME
} from '../slices/sliceNames';

const rootReducer = combineReducers({
  [BURGER_INGREDIENTS_SLICE_NAME]: burgerIngredientsReducer,
  [BURGER_CONSTRUCTOR_SLICE_NAME]: burgerConstructorReducer,
  [FEEDS_SLICE_NAME]: feedSliceReducer,
  [USER_SLICE_NAME]: userReducer,
  [ORDER_DETAILS_SLICE_NAME]: orderDetailsReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
