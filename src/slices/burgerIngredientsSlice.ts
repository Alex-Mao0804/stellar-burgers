import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../utils/burger-api';

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
  name: 'burgerIngredients',
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

export const { loadingIngredients, getIngredients } =
  burgerIngredientsSlice.selectors;
export const {} = burgerIngredientsSlice.actions;
export const getIngredientById = (state: TIngredientsState, id: string) =>
  state.ingredients.find((ingredient) => ingredient._id === id);
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;

export const fetchIngredientsData = createAsyncThunk<TIngredient[]>(
  'burgerIngredients/fetchIngredientsData',
  async () => await getIngredientsApi()
);
