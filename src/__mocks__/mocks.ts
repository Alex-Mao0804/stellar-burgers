import { TOrder } from '@utils-types';

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

export { mockPostOrderResponse, mockUserOrdersResponse, mockOrderByIdResponse };
