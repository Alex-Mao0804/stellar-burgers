import { configureStore } from '@reduxjs/toolkit';
import {
  feedSliceReducer,
  fetchFeedsData,
  getOrderByNum
} from '../slices/feedSlice';
import { RequestStatus, TOrdersData } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api'; // Оставляем импорт здесь

// Мокируем getFeedsApi в правильном виде
jest.mock('../utils/burger-api', () => ({
  getFeedsApi: jest.fn() as jest.MockedFunction<typeof getFeedsApi>
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      feed: feedSliceReducer
    }
  });

describe('Проверяет редьюсер feed', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  test('Проверим состояние запроса в момент загрузки заказов', async () => {
    // Вызываем асинхронное действие
    store.dispatch(fetchFeedsData());

    // Проверяем состояние во время загрузки
    const stateBefore = store.getState().feed; // Получаем текущее состояние
    expect(stateBefore.requestStatus).toBe(RequestStatus.Loading); // Ожидаем что статус запроса - loading
  });
  describe('Проверяем состояние после успешной загрузки заказов', () => {
    // Заглушка для успешного ответа
    (getFeedsApi as jest.Mock).mockResolvedValue({
      orders: [
        {
          _id: '67287001b27b06001c3e644b',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Фалленианский краторный бессмертный минеральный экзо-плантаго бургер',
          createdAt: '2024-11-04T06:56:01.962Z',
          updatedAt: '2024-11-04T06:56:02.701Z',
          number: 58586
        },
        {
          _id: '67286ff1b27b06001c3e644a',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-11-04T06:55:45.733Z',
          updatedAt: '2024-11-04T06:55:46.529Z',
          number: 58585
        }
      ]
    });
    test('Проверим состояние запроса после успешной загрузки заказов', async () => {
      await store.dispatch(fetchFeedsData());

      const state = store.getState().feed;

      // Проверяем состояние после успешной загрузки
      expect(state.requestStatus).toBe(RequestStatus.Success);
      expect(state.error).toBeNull();
      expect(state.feeds.orders).toHaveLength(2); // Проверяем наличие заказов
    });
    test('Проверим получение заказа по номеру', async () => {
      await store.dispatch(fetchFeedsData());

      const state = store.getState().feed;
      const orderData = getOrderByNum(state, Number('58586'));

      expect(orderData).not.toBeNull();
    });
  });

  test('Проверим состояние запроса при ошибке загрузки заказов', async () => {
    // Заглушка для ошибки
    const mockError = new Error('Error fetching feeds');
    (getFeedsApi as jest.Mock).mockRejectedValue(mockError);

    await store.dispatch(fetchFeedsData());

    const state = store.getState().feed;

    // Проверяем состояние после неудачной загрузки
    expect(state.requestStatus).toBe(RequestStatus.Failed);
    expect(state.error).toBe(mockError.message);
  });
});
