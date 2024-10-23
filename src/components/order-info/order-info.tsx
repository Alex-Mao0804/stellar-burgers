import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNum, feedSliceSelectors } from '../../slices/feedSlice';
import { burgerIngredientsSelectors } from '../../slices/burgerIngredientsSlice';
import {
  orderDetailsSelectors,
  fetchGetOrderByNumber,
  orderDetailsActions
} from '../../slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { id: number } = useParams();
  const orderData = useSelector((state) => {
    if (getOrderByNum(state.feeds, Number(number))) {
      return getOrderByNum(state.feeds, Number(number));
    }
    if (orderDetailsSelectors.getOrderModalData(state)) {
      return orderDetailsSelectors.getOrderModalData(state);
    }
    return null;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchGetOrderByNumber(Number(number)));
    }
    return () => {
      dispatch(orderDetailsActions.clearOrderDetails());
    };
  }, [dispatch]);

  const ingredients: TIngredient[] = useSelector(
    burgerIngredientsSelectors.getIngredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
