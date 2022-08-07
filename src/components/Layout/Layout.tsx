import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { AppHeader } from './Header/Header';

export const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
