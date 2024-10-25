import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelectors,
  burgerConstructorActions
} from '../../slices/burgerConstructorSlice';
import {
  orderDetailsSelectors,
  fetchPostOrder,
  orderDetailsActions
} from '../../slices/orderDetailsSlice';
import { userSelectors } from '../../slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    burgerConstructorSelectors.getBurgerConstructor
  );
  const dispatch = useDispatch();
  const orderRequest = useSelector(orderDetailsSelectors.getIsLoading);
  const orderModalData = useSelector(orderDetailsSelectors.getOrderModalData);
  const user = useSelector(userSelectors.getUserState);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.name) {
      navigate('/login');
      return;
    }

    const ingredientsID = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];
    dispatch(fetchPostOrder(ingredientsID));
    dispatch(burgerConstructorActions.clearIngredients());
  };
  const closeOrderModal = () => {
    dispatch(orderDetailsActions.clearOrderDetails());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
