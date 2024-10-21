import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getAuthChecked, getUserState } from "../../slices/userSlice";
import { Preloader } from "../ui/preloader/preloader";

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({onlyUnAuth, children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getUserState)
  const location = useLocation();

  if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user.name) { // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user.name) { // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
        // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
        // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
        const from  = location.state?.from || { pathname: '/' };

        return <Navigate replace to={from} />;
  }

  return children ;

};
