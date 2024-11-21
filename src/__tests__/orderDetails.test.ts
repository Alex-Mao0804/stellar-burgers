import { configureStore } from '@reduxjs/toolkit';
import {
  orderDetailsReducer,
  fetchPostOrder,
  fetchUserOrders,
  fetchGetOrderByNumber
} from '../slices/orderDetailsSlice';
import { RequestStatus, TOrder } from '@utils-types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';
import { log } from 'console';

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

let store: ReturnType<typeof createMockStore>;

beforeEach(() => {
  store = createMockStore();
});

describe('Проверяет редьюсер orderDetails', () => {
  describe('Проверим состояние запроса orderBurgerApi', () => {
    const orderIngredients = [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e'
    ];

    test('Проверим состояние запроса в момент загрузки', async () => {
      (orderBurgerApi as jest.Mock).mockImplementationOnce(
        () => new Promise(() => {})
      ); // Висит в ожидании
      store.dispatch(fetchPostOrder(orderIngredients));

      // Проверяем состояние во время загрузки
      const loadingState = store.getState().orderDetails;
      expect(loadingState.requestStatus).toBe(RequestStatus.Loading);
    });

    test('Проверим состояние запроса после успешной загрузки', async () => {
      const mockPostOrderResponse = {
        name: 'Флюоресцентный люминесцентный бургер',
        order: {
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun'
            },
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main'
            }
            // ... другие ингредиенты
          ],
          _id: '672876a0b27b06001c3e645a',
          status: 'done'
          // ... другие свойства заказа
        }
      };

      (orderBurgerApi as jest.Mock).mockResolvedValueOnce(
        mockPostOrderResponse
      );
      await store.dispatch(fetchPostOrder(orderIngredients));
      const finalState = store.getState().orderDetails;

      // Проверяем состояние после успешной загрузки
      expect(finalState.requestStatus).toBe(RequestStatus.Success);
      expect(finalState.order).toBeDefined(); // Проверка, что заказ определен
    });

    test('Имитация ошибки API', async () => {
      // Имитация ошибки API
      (orderBurgerApi as jest.Mock).mockRejectedValueOnce(
        new Error('Error fetching orders')
      );

      await store.dispatch(fetchPostOrder(orderIngredients));

      const newState = store.getState();
      expect(newState.orderDetails.requestStatus).toBe(RequestStatus.Failed);
      expect(newState.orderDetails.isError).toBe('Error fetching orders');
    });

    describe('Проверим состояние запроса getOrdersApi', () => {
      test('Проверим состояние запроса в момент загрузки', async () => {
        (getOrdersApi as jest.Mock).mockImplementationOnce(
          () => new Promise(() => {})
        ); // Висит в ожидании
        store.dispatch(fetchUserOrders());
        // Проверяем состояние во время загрузки
        const loadingState = store.getState().orderDetails;
        expect(loadingState.requestStatus).toBe(RequestStatus.Loading);
      });

      test('Проверим состояние запроса после успешной загрузки', async () => {
        const mockUserOrdersResponse: TOrder[] = [
          {
            _id: '6724d132b27b06001c3e5b82',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-11-01T13:01:38.803Z',
            updatedAt: '2024-11-01T13:01:39.740Z',
            number: 58352
          },
          {
            _id: '6724d28eb27b06001c3e5b85',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Краторный био-марсианский люминесцентный бургер',
            createdAt: '2024-11-01T13:07:26.081Z',
            updatedAt: '2024-11-01T13:07:26.995Z',
            number: 58353
          }
          // ... другие заказы
        ];
        (getOrdersApi as jest.Mock).mockResolvedValueOnce(
          mockUserOrdersResponse
        );
        await store.dispatch(fetchUserOrders());
        const finalState = store.getState().orderDetails;
        // Проверяем состояние после успешной загрузки
        expect(finalState.requestStatus).toBe(RequestStatus.Success);
        expect(finalState.userOrders).toBeDefined();
        expect(finalState.userOrders).toHaveLength(2);
      });

      test('Проверим состояние запроса после ошибки', async () => {
        (getOrdersApi as jest.Mock).mockRejectedValueOnce(
          new Error('Error fetching orders')
        );
        await store.dispatch(fetchUserOrders());
        const finalState = store.getState().orderDetails;
        // Проверяем состояние после ошибки
        expect(finalState.requestStatus).toBe(RequestStatus.Failed);
        expect(finalState.isError).toBe('Error fetching orders');
      });
    });

    describe('Проверим состояние запроса getOrderByNumberApi', () => {
      test('Проверим состояние запроса в момент загрузки', async () => {
        (getOrderByNumberApi as jest.Mock).mockImplementationOnce(
          () => new Promise(() => {})
        ); // Висит в ожидании
        store.dispatch(fetchGetOrderByNumber(58352));
        // Проверяем состояние во время загрузки
        const loadingState = store.getState().orderDetails;
        expect(loadingState.requestStatus).toBe(RequestStatus.Loading);
      });

      test('Проверим состояние запроса после успешной загрузки', async () => {
        const mockOrderByIdResponse = {
          success: true,
          orders: [
            {
              _id: '6724d132b27b06001c3e5b82',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e'
              ],
              owner: '6724cef8b27b06001c3e5b7d',
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2024-11-01T13:01:38.803Z',
              updatedAt: '2024-11-01T13:01:39.740Z',
              number: 58352,
              __v: 0
            }
          ]
        };
        (getOrderByNumberApi as jest.Mock).mockResolvedValueOnce(
          mockOrderByIdResponse
        );
        await store.dispatch(fetchGetOrderByNumber(58352));
        const finalState = store.getState().orderDetails;
        // // Проверяем состояние после успешной загрузки
        expect(finalState.requestStatus).toBe(RequestStatus.Success);
        expect(finalState.order).toBeDefined();
      });

      test('Проверим состояние запроса после ошибки', async () => {
        (getOrderByNumberApi as jest.Mock).mockRejectedValueOnce(
          new Error('Error fetching orders')
        );
        await store.dispatch(fetchGetOrderByNumber(58352));
        const finalState = store.getState().orderDetails;
        // Проверяем состояние после ошибки
        expect(finalState.requestStatus).toBe(RequestStatus.Failed);
        expect(finalState.isError).toBe('Error fetching orders');
      });
    });
  });
});
