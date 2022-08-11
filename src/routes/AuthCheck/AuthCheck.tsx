import { FC, ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import { selectIsSignedIn } from 'app';
import { APP_ROUTES } from 'routes/enums';
import { useAppSelector } from 'store';

type Props = {
  children?: ReactElement;
};

export const AuthCheck: FC<Props> = ({ children }) => {
  const isSignedIn = useAppSelector(selectIsSignedIn);

  if (!isSignedIn) return <Navigate to={APP_ROUTES.MAIN} />;

  return children || null;
};
