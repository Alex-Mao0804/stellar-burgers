import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {TOrder,TOrdersData} from '@utils-types';
import {getOrdersApi, orderBurgerApi} from '../utils/burger-api';
import { get } from 'http';

type TOrdersState = {
orders: TOrder[];
    loading: boolean;
    error: string | null;
};

const initialState: TOrdersState = {

        orders: [],

    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {},
    selectors: {
      isLoading: (state) => state.loading,
        getOrders: (state) => state.orders,

      },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.orders = action.payload;

          })
          .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
          })
          
      },
});

export const {isLoading, getOrders } = ordersSlice.selectors
// export const { } = ingredientsSlice.actions
// Если у вас есть отдельный слайс для ингредиентов
// export const getIngredientById = (state: TOrdersDataState, id: string) =>
//   state.feeds.orders.ingredients.find((ingredient) => ingredient._id === id);

export const ordersSliceReducer = ordersSlice.reducer;

export const fetchUserOrders = createAsyncThunk(
    'userOrders/fetchUserOrders',
    async () => {
      const data = await getOrdersApi()
      return data;
    });

