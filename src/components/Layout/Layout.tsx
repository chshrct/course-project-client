import { FC } from 'react';

import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { AppHeader } from './AppHeader';

export const Layout: FC = () => {
  return (
    <AppShell padding={0} header={<AppHeader />} styles={{ main: { width: '100%' } }}>
      <Outlet />
    </AppShell>
  );
};
