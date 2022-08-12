import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { setError, setUserAccessBasic, signOut } from 'app';

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    try {
      if (action.payload.data.name === 'Account doesnt exist') {
        api.dispatch(
          setError({
            title: 'Account doesnt exist',
            message: 'You can sign up to create new account',
          }),
        );
        api.dispatch(signOut());
      }
      if (action.payload.data.name === 'Account is blocked') {
        api.dispatch(
          setError({
            title: 'Account is blocked',
            message: 'Contact administrator',
          }),
        );
        api.dispatch(signOut());
      }
      if (action.payload.data.name === 'Email allready taken') {
        api.dispatch(
          setError({
            title: 'Email allready taken',
            message: 'If its your email you might have existing account',
          }),
        );
      }
      if (action.payload.data.name === 'You are not allowed to access this resource') {
        api.dispatch(
          setError({
            title: 'You are not allowed to access this resource',
            message: 'You need admin rights to access this resource',
          }),
        );
        api.dispatch(setUserAccessBasic());
      }
    } catch (e) {
      console.warn('Couldnt handle rejected action, got error: ', e);
    }
  }

  return next(action);
};
