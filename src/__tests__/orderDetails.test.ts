import { configureStore } from '@reduxjs/toolkit';
import {
  orderDetailsReducer,
  fetchPostOrder,
  fetchUserOrders,
  fetchGetOrderByNumber
} from '../slices/orderDetailsSlice';
import { RequestStatus } from '@utils-types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  orderBurgerApi: jest.fn() as jest.MockedFunction<typeof orderBurgerApi>,
  getOrdersApi: jest.fn() as jest.MockedFunction<typeof getOrdersApi>,
  getOrderByNumberApi: jest.fn() as jest.MockedFunction<
    typeof getOrderByNumberApi
  >
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      orderDetails: orderDetailsReducer
    }
  });

describe('Проверяет редьюсер orderDetails', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  test('Проверим состояние запроса orderBurgerApi', async () => {
    // Заглушка для успешного ответа API
    (orderBurgerApi as jest.Mock).mockResolvedValueOnce({
      success: true,
      name: 'Флюоресцентный люминесцентный бургер',
      order: {
        ingredients: [
          { _id: '643d69a5c3f7b9001cfa093d', name: 'Флюоресцентная булка R2-D3', type: 'bun' },
          { _id: '643d69a5c3f7b9001cfa093e', name: 'Филе Люминесцентного тетраодонтимформа', type: 'main' },
          // ... другие ингредиенты
        ],
        _id: '672876a0b27b06001c3e645a',
        status: 'done',
        // ... другие свойства заказа
      }
    });
  
    // Проверяем состояние до диспетчеризации
    const initialState = store.getState().orderDetails;
    expect(initialState.requestStatus).toBe(RequestStatus.Idle);
  
    // Вызываем асинхронное действие
    const dispatchPromise = store.dispatch(fetchPostOrder(['643d69a5c3f7b9001cfa093c']));
  
    // Проверяем состояние во время загрузки
    const loadingState = store.getState().orderDetails;
    expect(loadingState.requestStatus).toBe(RequestStatus.Loading);
  
    // Ждем завершения промиса
    await dispatchPromise;
  
    const finalState = store.getState().orderDetails;
  
    // Проверяем состояние после успешной загрузки
    expect(finalState.requestStatus).toBe(RequestStatus.Success);
    expect(finalState.order).toBeDefined(); // Проверка, что заказ определен
  });
  
});
