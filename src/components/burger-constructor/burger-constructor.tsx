import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredients,
  getBurgerConstructor
} from '../../slices/burgerConstructorSlice';
import {
  getOrderModalData,
  getIsLoading,
  fetchPostOrder,
  clearOrderDetails
} from '../../slices/orderDetailsSlice';
import { getAuthChecked, getUserState } from '../../slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurgerConstructor);
  const dispatch = useDispatch();
  const orderRequest = useSelector(getIsLoading);
  const orderModalData = useSelector(getOrderModalData);
  const user = useSelector(getUserState);
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
    dispatch(clearIngredients());
  };
  const closeOrderModal = () => {
    dispatch(clearOrderDetails());
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
