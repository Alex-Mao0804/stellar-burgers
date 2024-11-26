import { configureStore } from '@reduxjs/toolkit';
import {
  fetchIngredientsData,
  burgerIngredientsReducer
} from '../slices/burgerIngredientsSlice';
import { RequestStatus } from '@utils-types';
import { getIngredientsApi } from '../utils/burger-api'; // Оставляем импорт здесь
import mockIngredients from '../../cypress/fixtures/ingredients.json'; // Импортируйте ваш JSON файл

// Мокируем getIngredientsApi в правильном виде
jest.mock('../utils/burger-api', () => ({
  getIngredientsApi: jest.fn() as jest.MockedFunction<typeof getIngredientsApi>
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      burgerIngredients: burgerIngredientsReducer
    }
  });

describe('Проверяет редьюсер burgerIngredients', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  test('Проверим состояние запроса в момент загрузки ингредиентов', async () => {
    // Вызываем асинхронное действие
    store.dispatch(fetchIngredientsData());

    // Проверяем состояние во время загрузки
    const stateBefore = store.getState().burgerIngredients; // Получаем текущее состояние
    expect(stateBefore.requestStatus).toBe(RequestStatus.Loading); // Ожидаем что статус запроса - loading
  });

  test('Проверим состояние запроса после успешной загрузки ингредиентов', async () => {
    // Заглушка для успешного ответа
    (getIngredientsApi as jest.Mock).mockResolvedValue(mockIngredients.data);

    await store.dispatch(fetchIngredientsData());

    const state = store.getState().burgerIngredients;

    // Проверяем состояние после успешной загрузки
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.error).toBeNull();
    expect(state.ingredients).toHaveLength(3); // Проверяем наличие ингредиентов
  });

  test('Проверим состояние запроса при ошибке загрузки ингредиентов', async () => {
    // Заглушка для ошибки
    const mockError = new Error('Error fetching ingredients');
    (getIngredientsApi as jest.Mock).mockRejectedValue(mockError);

    await store.dispatch(fetchIngredientsData());

    const state = store.getState().burgerIngredients;

    // Проверяем состояние после неудачной загрузки
    expect(state.requestStatus).toBe(RequestStatus.Failed);
    expect(state.error).toBe(mockError.message);
  });
});
