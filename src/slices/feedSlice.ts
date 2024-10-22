import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api';
import { get } from 'http';
import { FEEDS_SLICE_NAME } from '../slices/sliceNames';

type TOrdersDataState = {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersDataState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    isLoading: (state) => state.loading,
    getOrders: (state) => state.feeds.orders,
    getFeed: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feeds = action.payload;
      })
      .addCase(fetchFeedsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { isLoading, getOrders, getFeed } = feedSlice.selectors;
export const getOrderByNum = (state: TOrdersDataState, num: number) =>
  state.feeds.orders.find((order) => order.number === num);
export const feedSliceReducer = feedSlice.reducer;

export const fetchFeedsData = createAsyncThunk<TOrdersData>(
  `${FEEDS_SLICE_NAME}/fetchFeedsData`,
  async () => await getFeedsApi()
);
