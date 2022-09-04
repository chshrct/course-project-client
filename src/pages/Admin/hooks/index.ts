import { useEffect } from 'react';

import { useAccessCheckArgsType } from './types';

import { setError } from 'app';
import i18n from 'localization/i18n';
import { APP_ROUTES } from 'routes';

export const useAccessCheck = ({
  navigate,
  dispatch,
  userAccess,
}: useAccessCheckArgsType): void => {
  useEffect(() => {
    if (userAccess === 'basic') {
      navigate(APP_ROUTES.MAIN);
      dispatch(
        setError({
          title: i18n.t('error_title_userAccess'),
          message: i18n.t('error_message_userAccess'),
        }),
      );
    }
  }, [dispatch, navigate, userAccess]);
};
