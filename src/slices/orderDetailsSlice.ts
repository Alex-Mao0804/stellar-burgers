import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi, getOrdersApi } from '../utils/burger-api';
import { clear } from 'console';
import { clearScreenDown } from 'readline';
import { ORDER_DETAILS_SLICE_NAME } from './sliceNames';

type TOrderDetailsState = {
  order: TOrder | null;
  name: string;
  success: boolean;
  isLoading: boolean;
  isError: string;
  userOrders: TOrder[];
};

const initialState: TOrderDetailsState = {
  order: null,
  name: '',
  success: false,
  isLoading: false,
  isError: '',
  userOrders: []
};

const orderDetailsSlice = createSlice({
  name: ORDER_DETAILS_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderDetails: (state) => (state = initialState)
  },
  selectors: {
    getOrderModalData: (state) => state.order,
    getIsLoading: (state) => state.isLoading,
    getUserOrders: (state) => state.userOrders
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
        state.order = action.payload.order;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
      })

      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message ?? '';
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.userOrders = action.payload;
      });
  }
});

export const orderDetailsSelectors =
  orderDetailsSlice.selectors;
export const orderDetailsActions = orderDetailsSlice.actions;

export const orderDetailsReducer = orderDetailsSlice.reducer;

export const fetchPostOrder = createAsyncThunk(
  `${ORDER_DETAILS_SLICE_NAME}/fetchPostOrder`,
  async (ingredientsID: string[]) => {
    const data = await orderBurgerApi(ingredientsID);

    return data;
  }
);

export const fetchUserOrders = createAsyncThunk(
  `${ORDER_DETAILS_SLICE_NAME}/fetchUserOrders`,
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);
