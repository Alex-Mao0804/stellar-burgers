import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { getAuthenticated, getError, loginUser} from '../../slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(getError);
  const isAuth = useSelector(getAuthenticated);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuth) {
    return (
      <Navigate
        to={'/'}
      />
    );
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
