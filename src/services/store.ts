import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {burgerIngredientsReducer}  from '../slices/burgerIngredientsSlice';
import {burgerConstructorReducer}  from '../slices/burgerConstructorSlice';
import {feedSliceReducer}  from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import {orderDetailsReducer}  from '../slices/orderDetailsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
// import { ordersSliceReducer } from '../slices/ordersSlice';

const rootReducer = combineReducers({ 
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feeds: feedSliceReducer,
  user: userReducer,
  // userOrders: ordersSliceReducer,
  orderDetails: orderDetailsReducer

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
