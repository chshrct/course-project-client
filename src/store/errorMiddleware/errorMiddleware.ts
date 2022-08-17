import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { setError, setUserAccessBasic, signOut } from 'app';
import i18n from 'shared/localization/i18n';

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    try {
      if (action.payload.data.name === 'Account doesnt exist') {
        api.dispatch(
          setError({
            title: i18n.t('error_title_accountExists'),
            message: i18n.t('error_message_accountExists'),
          }),
        );
        api.dispatch(signOut());
      }
      if (action.payload.data.name === 'Account is blocked') {
        api.dispatch(
          setError({
            title: i18n.t('error_title_userStatus'),
            message: i18n.t('error_message_userStatus'),
          }),
        );
        api.dispatch(signOut());
      }
      if (action.payload.data.name === 'Email allready taken') {
        api.dispatch(
          setError({
            title: i18n.t('error_title_emailTaken'),
            message: i18n.t('error_message_emailTaken'),
          }),
        );
      }
      if (action.payload.data.name === 'Name allready taken') {
        api.dispatch(
          setError({
            title: i18n.t('error_title_nameTaken'),
            message: i18n.t('error_message_nameTaken'),
          }),
        );
      }
      if (action.payload.data.name === 'You are not allowed to access this resource') {
        api.dispatch(
          setError({
            title: i18n.t('error_title_userAccess'),
            message: i18n.t('error_message_userAccess'),
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
