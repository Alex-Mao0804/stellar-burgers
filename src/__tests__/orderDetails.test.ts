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
import {
  mockOrderByIdResponse,
  mockPostOrderResponse,
  mockUserOrdersResponse
} from '../__mocks__/mocks';

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
