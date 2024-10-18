import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '../../utils/burger-api';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, getAuthenticated, getError } from '../../slices/userSlice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(getError);
  const isAuth = useSelector(getAuthenticated);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
        const userData = {
      name: userName,
      email,
      password,
    };
    await dispatch(registerUser(userData));
  }

  if (isAuth) {
    return (
        <Navigate
          to={'/'}
        />
      );
}
  return (
    <RegisterUI
      errorText={errorText} // Передаем текст ошибки в UI
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
