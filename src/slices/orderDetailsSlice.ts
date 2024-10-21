import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TConstructorIngredient, TIngredient, TOrder} from '@utils-types';
import {orderBurgerApi} from '../utils/burger-api';
import { clear } from 'console';
import { clearScreenDown } from 'readline';

type TOrderDetailsState = {
  order: TOrder | null
  name: string;
  success: boolean;
    isLoading: boolean;
    isError: string;

};

const initialState: TOrderDetailsState = {
  order: null,
  name: '',
  success: false,
  isLoading: false,
  isError: '',
};

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
      clearOrderDetails: (state) => state = initialState
    },
    selectors: {
      getOrderModalData: (state) => state.order,
      getIsLoading: (state) => state.isLoading,
    },

      extraReducers: (builder) => {
        builder
        .addCase(fetchPostOrder.pending, (state) => {
            state.isLoading = true;
            state.success = false;
            state.isError = '';
              })
        .addCase(fetchPostOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.isError = action.error.message ?? '';
        })
        .addCase(fetchPostOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = action.payload.success;
          state.name = action.payload.name;
          state.order = action.payload.order
        })
      }

});

export const {getOrderModalData, getIsLoading} = orderDetailsSlice.selectors
export const {clearOrderDetails} = orderDetailsSlice.actions
export const orderDetailsReducer = orderDetailsSlice.reducer;

export const fetchPostOrder = createAsyncThunk(
    'orderDetails/fetchPostOrder',
    async (ingredientsID: string[]) => {
      const data = await orderBurgerApi(ingredientsID)
      console.log(data)
      return data;
    })
