import { FC } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { APP_ROUTES } from './enums';

import { Layout } from 'components';
import { Main, NotFound } from 'pages';

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
  ]);

  return appRoutes;
};
