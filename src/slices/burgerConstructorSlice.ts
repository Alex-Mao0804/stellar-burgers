import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';
import { orderBurgerApi } from '../utils/burger-api';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '../slices/sliceNames';

type TBurgerConstructorState = {
  bun?: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  ingredients: TConstructorIngredient[];
  requestStatus: RequestStatus;
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

const burgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.bun = {
          _id: action.payload._id,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price
        };
      } else {
        state.ingredients.push(action.payload);
      }
    },

    clearIngredients(state) {
      state.bun = undefined;
      state.ingredients = [];
    },

    onUpdateIngredients(state, action) {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getBurgerConstructor: (state) => state,
    getIngredients: (state) => state.ingredients
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchPostOrders.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchPostOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
      });
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorActions = burgerConstructorSlice.actions;
export default burgerConstructorSlice;

export const fetchPostOrders = createAsyncThunk(
  `${BURGER_CONSTRUCTOR_SLICE_NAME}/fetchPostOrders`,
  async (ingredients: TConstructorIngredient[]) => {
    const id: string[] = ingredients.map((ingredient) => ingredient._id);
    const data = await orderBurgerApi(id);
    return data;
  }
);
