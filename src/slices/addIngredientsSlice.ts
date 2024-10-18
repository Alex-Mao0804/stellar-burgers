import { createSlice} from '@reduxjs/toolkit';
import {TConstructorIngredient, TIngredient} from '@utils-types';

type TAddIngredientsState = {
    bun?: {
        _id: string ;
        name: string ;
        image: string;
        price: number;
    }
    ingredients: TConstructorIngredient[];
};

const initialState: TAddIngredientsState = {

    ingredients: [],

};

const addIngredientsSlice = createSlice({
    name: 'addIngredients',
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
        //   removeIngredient(state, action) {
        //     if (action.payload.type === 'bun') {
        //         state.bun = {
        //             _id: '',
        //             name: '',
        //             image: '',
        //             price: 0
        //         };
        //     } else {
        //         state.ingredients = state.ingredients.filter(
        //             (ingredient) => ingredient._id !== action.payload
        //         );
        //     }
        //   },
          clearIngredients(state) {
            state.bun = {
                _id: '',
                name: '',
                image: '',
                price: 0
            }
            state.ingredients = [];
          },

          onUpdateIngredients(state, action) {
            state.ingredients = action.payload;
          },

    },
    selectors: {
        getBurgerConstructor: (state) => state,

        getIngredients: (state) => state.ingredients,
      },

});

export const {getBurgerConstructor, getIngredients} = addIngredientsSlice.selectors
export const {addIngredient, clearIngredients,  onUpdateIngredients} = addIngredientsSlice.actions
export const addIngredientsReducer = addIngredientsSlice.reducer;

