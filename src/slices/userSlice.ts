import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {TUser} from '@utils-types';
import {loginUserApi, TLoginData, registerUserApi, TRegisterData} from '../utils/burger-api';
import { get } from 'http';
import { FC } from 'react';
import { setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser
  isAuthChecked: boolean
  isAuthenticated: boolean
  loginUserError: string
  loginUserRequest: boolean
}


const initialState: TUserState = {
  user: {
    name: '',
    email: '',
  },
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: '',
  loginUserRequest: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    selectors: {
      getUser: (state) => state.user,
      getError: (state) => state.loginUserError,
      getIsLoader: (state) => state.loginUserRequest,
      getAuthenticated: (state) => state.isAuthenticated
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
          state.loginUserRequest = true;
          state.loginUserError = '';
            })
      .addCase(loginUser.rejected, (state, action) => {
            state.loginUserRequest = false;
          state.loginUserError = action.error.message ?? '';
          state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
              state.user = action.payload.user;
          state.loginUserRequest = false;
                state.isAuthenticated = true;
          state.isAuthChecked = true;
      })



      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = '';
          })
    .addCase(registerUser.rejected, (state, action) => {
          state.loginUserRequest = false;
        state.loginUserError = action.error.message ?? '';
        state.isAuthChecked = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
        state.loginUserRequest = false;
              state.isAuthenticated = true;
        state.isAuthChecked = true;
    })

  }
});

export const {getUser, getError, getIsLoader, getAuthenticated} = userSlice.selectors
// export const { } = ingredientsSlice.actions
// Если у вас есть отдельный слайс для ингредиентов
// export const getIngredientById = (state: TOrdersDataState, id: string) =>
//   state.feeds.orders.ingredients.find((ingredient) => ingredient._id === id);

export const userReducer = userSlice.reducer;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TLoginData, 'name'>) => {
    const data = await loginUserApi({ email, password })
    if (!data?.success) {
            return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
}
); 

export const registerUser = createAsyncThunk(
  'user/registerUser', // исправлено здесь
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name })
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
