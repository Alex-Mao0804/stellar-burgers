import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  getAuthenticated,
  getError,
  loginUser,
  getAuthChecked
} from '../../slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../components/ui/preloader/preloader';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(getError);
  const isAuth = useSelector(getAuthenticated);
  const isAuthChecked = useSelector(getAuthChecked);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
