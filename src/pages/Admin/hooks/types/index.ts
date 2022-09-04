import { NavigateFunction } from 'react-router-dom';

import { UserAccessType } from 'api';
import { AppDispatch } from 'store';

export type useAccessCheckArgsType = {
  userAccess: UserAccessType;
  navigate: NavigateFunction;
  dispatch: AppDispatch;
};
