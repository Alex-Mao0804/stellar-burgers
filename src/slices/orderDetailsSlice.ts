import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';
import { ORDER_DETAILS_SLICE_NAME } from './sliceNames';

type TOrderDetailsState = {
  order: TOrder | null;
  name: string;
  requestStatus: RequestStatus;
  isError: string;
  userOrders: TOrder[];
};

const initialState: TOrderDetailsState = {
  order: null,
  name: '',
  requestStatus: RequestStatus.Idle,
  isError: '',
  userOrders: []
};

const orderDetailsSlice = createSlice({
  name: ORDER_DETAILS_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderDetails: (state) => (state = initialState),
    clearOrderModalData: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrderModalData: (state) => state.order,
    getIsLoading: (state) => state.requestStatus === RequestStatus.Loading,
    getUserOrders: (state) => state.userOrders
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isError = '';
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.isError = action.error.message ?? '';
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isError = '';
      })

      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.isError = action.error.message ?? '';
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.isError = '';
        state.userOrders = action.payload;
      })

      .addCase(fetchGetOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.isError = '';
      })
      .addCase(fetchGetOrderByNumber.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.isError = action.error.message ?? '';
      })
      .addCase(fetchGetOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.order = action.payload.orders[0];
      });
  }
});

export const orderDetailsSelectors = orderDetailsSlice.selectors;
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

export const fetchGetOrderByNumber = createAsyncThunk(
  `${ORDER_DETAILS_SLICE_NAME}/fetchGetOrderByNumber`,
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);
