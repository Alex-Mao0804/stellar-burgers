import { rootReducer } from '../services/store';
import {
  BURGER_CONSTRUCTOR_SLICE_NAME,
  BURGER_INGREDIENTS_SLICE_NAME,
  FEEDS_SLICE_NAME,
  ORDER_DETAILS_SLICE_NAME,
  USER_SLICE_NAME
} from '../slices/sliceNames';

describe('Проверяем правильную инициализацию rootReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = {
      [BURGER_INGREDIENTS_SLICE_NAME]: {
        error: null,
        ingredients: [],
        requestStatus: 'Idle'
      },
      [BURGER_CONSTRUCTOR_SLICE_NAME]: {
        ingredients: [],
        requestStatus: 'Idle'
      },
      [FEEDS_SLICE_NAME]: {
        error: null,
        feeds: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        requestStatus: 'Idle'
      },
      [ORDER_DETAILS_SLICE_NAME]: {
        isError: '',
        name: '',
        order: null,
        requestStatus: 'Idle',
        userOrders: []
      },
      [USER_SLICE_NAME]: {
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

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
