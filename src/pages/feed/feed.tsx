import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeedsData, getOrders, isLoading } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading); // Получаем состояние загрузки
  const orders: TOrder[] = useSelector(getOrders);
  useEffect(() => {
    dispatch(fetchFeedsData());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeedsData());
      }}
    />
  );
};
