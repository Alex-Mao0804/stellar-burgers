import { FC } from 'react';
import { AppHeaderUI } from '@ui';
interface AppHeaderProps {
  userName: string; // Указываем тип для userName
}

export const AppHeader: FC<AppHeaderProps> = ({ userName }) =>  <AppHeaderUI userName={userName} />;
