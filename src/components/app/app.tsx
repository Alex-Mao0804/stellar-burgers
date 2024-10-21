import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredientsData } from '../../slices/burgerIngredientsSlice';
import { getUserState, getUserApiThunk } from '../../slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(fetchIngredientsData());
    dispatch(getUserApiThunk());
  }, []);

  const user = useSelector(getUserState);

  return (
  <div className={styles.app}>
    <AppHeader userName={user.name}/>
    <Routes>
      <Route path='*' element={<NotFound404 />} />
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal title={'Заказ'} onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
      <Route
        path='/login'
        element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute >
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route path='/profile'>
        <Route
          index
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute >
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders/:number'
          element={
            <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
      <Route path='/ingredients/:id' element={<Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}><IngredientDetails /></Modal>} />
    </Routes>

  </div>
)
};

export default App;
