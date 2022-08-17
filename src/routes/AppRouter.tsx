import { FC } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { AuthCheck } from './AuthCheck';
import { APP_ROUTES } from './enums';

import { Admin, Collection, Main, NotFound, User } from 'pages';
import { Layout } from 'shared/components';

export const AppRouter: FC = () => {
  const appRoutes = useRoutes([
    {
      index: true,
      element: <Navigate to={APP_ROUTES.MAIN} />,
    },
    {
      path: APP_ROUTES.ANY,
      element: <Navigate to={APP_ROUTES.NOT_FOUND} />,
    },
    {
      path: APP_ROUTES.NOT_FOUND,
      element: <Layout />,
      children: [{ index: true, element: <NotFound /> }],
    },
    {
      path: APP_ROUTES.MAIN,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Main />,
        },
      ],
    },
    {
      path: APP_ROUTES.ADMIN,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          index: true,
          element: <Admin />,
        },
      ],
    },
    {
      path: APP_ROUTES.USER,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          path: APP_ROUTES.ID,
          element: <User />,
        },
      ],
    },
    {
      path: APP_ROUTES.COLLECTION,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          path: APP_ROUTES.ID,
          element: <Collection />,
        },
      ],
    },
  ]);

  return appRoutes;
};
