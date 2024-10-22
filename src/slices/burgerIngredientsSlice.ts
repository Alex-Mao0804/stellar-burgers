import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../utils/burger-api';
import { BURGER_INGREDIENTS_SLICE_NAME } from '../slices/sliceNames';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const burgerIngredientsSlice = createSlice({
  name: BURGER_INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    loadingIngredients: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const burgerIngredientsSelectors = burgerIngredientsSlice.selectors;
export const getIngredientById = (state: TIngredientsState, id: string) =>
  state.ingredients.find((ingredient) => ingredient._id === id);
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;

export const fetchIngredientsData = createAsyncThunk<TIngredient[]>(
  `${BURGER_INGREDIENTS_SLICE_NAME}/fetchIngredientsData`,
  async () => await getIngredientsApi()
);
