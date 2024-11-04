import RootState from '../services/store';

describe('Проверяем правильную инициализацию rootReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = {
      burgerConstructor: {
        ingredients: [],
        requestStatus: 'Idle'
      },
      burgerIngredients: {
        error: null,
        ingredients: [],
        requestStatus: 'Idle'
      },
      feeds: {
        error: null,
        feeds: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        requestStatus: 'Idle'
      },
      orderDetails: {
        isError: '',
        name: '',
        order: null,
        requestStatus: 'Idle',
        userOrders: []
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        loginUserError: '',
        requestStatus: 'Idle',
        user: {
          email: '',
          name: ''
        }
      }
    };

    const state = RootState.getState();
    expect(state).toEqual(initialState);
  });
});