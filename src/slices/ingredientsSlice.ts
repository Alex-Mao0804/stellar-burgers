import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {TIngredient} from '@utils-types';
import {getIngredientsApi} from '../utils/burger-api';

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

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
        loadingIngredients: (state) => state.loading,
        getIngredients: (state) => state.ingredients,

        // getIngredientById: (state) => (id: string) => state.ingredients.find((ingredient) => ingredient._id === id),
        
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
      },
});

export const {loadingIngredients, getIngredients } = ingredientsSlice.selectors
export const { } = ingredientsSlice.actions
export const getIngredientById = (state: TIngredientsState, id: string) =>
  state.ingredients.find((ingredient) => ingredient._id === id);
export const ingredientsReducer = ingredientsSlice.reducer;

export const fetchIngredientsData = createAsyncThunk<TIngredient[]>(
    'ingredients/fetchIngredientsData',
    async () => {
        return await getIngredientsApi(); }
);