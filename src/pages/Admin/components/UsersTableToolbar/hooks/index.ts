import { useEffect } from 'react';

import { UseSelfBlockOrAccessDowngradeArgsType, UseSelfDeleteType } from './types';

import { setError, setUserAccessBasic, signOut } from 'app';
import i18n from 'localization/i18n';

export const useSelfBlockOrAccessDowngrade = ({
  dispatch,
  isUpdateSuccess,
  signedInUserId,
  selectedUsersIds,
  usersData,
}: UseSelfBlockOrAccessDowngradeArgsType): void => {
  useEffect(() => {
    if (isUpdateSuccess && usersData) {
      if (
        selectedUsersIds.includes(signedInUserId) &&
        usersData.users[0].access === 'basic'
      )
        dispatch(setUserAccessBasic());
      if (
        selectedUsersIds.includes(signedInUserId) &&
        usersData.users[0].status === 'blocked'
      ) {
        dispatch(
          setError({
            title: i18n.t('error_title_userStatus'),
            message: i18n.t('error_message_userStatus'),
          }),
        );
        dispatch(signOut());
      }
    }
  }, [dispatch, isUpdateSuccess, signedInUserId, selectedUsersIds, usersData]);
};

export const useSelfDelete = ({
  dispatch,
  isDeleteSuccess,
  signedInUserId,
  selectedUsersIds,
}: UseSelfDeleteType): void => {
  useEffect(() => {
    if (isDeleteSuccess) {
      if (selectedUsersIds.includes(signedInUserId)) {
        dispatch(
          setError({
            title: i18n.t('error_title_accountExists'),
            message: i18n.t('error_message_accountExists'),
          }),
        );
        dispatch(signOut());
      }
    }
  }, [dispatch, isDeleteSuccess, signedInUserId, selectedUsersIds]);
};
