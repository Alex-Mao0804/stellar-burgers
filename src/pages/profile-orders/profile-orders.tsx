import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, getUserOrders} from '../../slices/orderDetailsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserOrders);
  return <ProfileOrdersUI orders={orders} />;
};
