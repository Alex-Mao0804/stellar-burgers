import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../utils/burger-api';
import {BURGER_CONSTRUCTOR_SLICE_NAME} from '../slices/sliceNames';

type TBurgerConstructorState = {
  bun?: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  ingredients: TConstructorIngredient[];
  request?: boolean;
  error?: string;
};

const initialState: TBurgerConstructorState = {
  ingredients: []
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
        state.request = true;
        state.error = '';
      })
      .addCase(fetchPostOrders.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? '';
      })
      .addCase(fetchPostOrders.fulfilled, (state, action) => {
        // state.user = action.payload.user;

        // state.ingredients = action.payload
        state.request = false;
        // state.checked = true;
      });
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;


export const burgerConstructorSelectors =  burgerConstructorSlice.selectors;  
export const burgerConstructorActions =  burgerConstructorSlice.actions;
export default burgerConstructorSlice;

export const fetchPostOrders = createAsyncThunk(
  `${BURGER_CONSTRUCTOR_SLICE_NAME}/fetchPostOrders`,
  async (ingredients: TConstructorIngredient[]) => {
    const id: string[] = ingredients.map((ingredient) => ingredient._id);
    const data = await orderBurgerApi(id);
    console.log(data);
    return data;
  }
);
