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
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredientsData } from '../../slices/burgerIngredientsSlice';
import { userSelectors, getUserApiThunk } from '../../slices/userSlice';
import { fetchFeedsData } from '../../slices/feedSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsData());
    dispatch(getUserApiThunk());
  }, [dispatch]);
  const location = useLocation();
  const background = location.state?.background;
  const user = useSelector(userSelectors.getUserState);
  const profileMatch = useMatch('/profile/orders/:id')?.params.id;
  const feedMatch = useMatch('/feed/:id')?.params.id;
  const orderNumber = profileMatch || feedMatch;
  return (
    <div className={styles.app}>
      <AppHeader userName={user.name} />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

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
            <ProtectedRoute>
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
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-large ${styles.detailHeader} `}
              >
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/profile/orders/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-large ${styles.detailHeader} `}
              >
                {'Детали заказа №' + orderNumber}
              </p>
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path='/feed/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-large ${styles.detailHeader} `}
              >
                {'Детали заказа №' + orderNumber}
              </p>
              <OrderInfo />
            </div>
          }
        />
      </Routes>

      {background && (
        <Routes>
          {/* <Route
            path='/feed/:id'
            element={
              <Modal title={'Заказ №'+ orderNumber} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          /> */}
          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Детали заказа №' + orderNumber}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal
                title={'Детали заказа №' + orderNumber}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
