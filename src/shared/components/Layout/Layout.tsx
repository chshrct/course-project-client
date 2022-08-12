import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { AppHeader } from './AppHeader';

export const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
