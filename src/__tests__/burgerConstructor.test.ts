import { RequestStatus } from '@utils-types';
import burgerConstructorSlice from '../slices/burgerConstructorSlice';

const { actions } = burgerConstructorSlice;
const { addIngredient, onUpdateIngredients } = actions;

describe('Проверяет редюсер слайса burgerConstructor', () => {
  const initialState = {
    bun: undefined,
    ingredients: [],
    requestStatus: RequestStatus.Idle
  };

  const ingredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    }
  ];

  it('должен обработать экшен добавления ингредиента для булки', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredients[0])
    );

    expect(newState.bun).toEqual({
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      price: 1255
    });
    expect(newState.ingredients).toEqual([]);
    expect(newState.requestStatus).toEqual(RequestStatus.Idle);
  });

  it('должен обработать экшен добавления ингредиента для основного ингредиента', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredients[1])
    );

    // Проверяем, что основной ингредиент был добавлен и имеет уникальный id
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии'
    });
    expect(newState.ingredients[0]).toHaveProperty('id'); // Убедитесь, что уникальный ID был добавлен
    expect(newState.requestStatus).toEqual(RequestStatus.Idle);
  });

  it('должен обработать экшен удаления ингредиентов', () => {
    const initialState = {
      bun: ingredients[0],
      ingredients: [Object.assign({id: ingredients[1]._id}, ingredients[1])],
      requestStatus: RequestStatus.Idle
    }
    const newIngredients = initialState.ingredients.filter((_, idx) => idx !== 0);
    const newState = burgerConstructorSlice.reducer(initialState, onUpdateIngredients(newIngredients));
  
    expect(newState.ingredients).toHaveLength(0);
  });
});
