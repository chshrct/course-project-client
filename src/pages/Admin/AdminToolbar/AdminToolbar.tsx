import { FC, useEffect } from 'react';

import { ActionIcon, Button, Group } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { selectUserId, setError, setUserAccessBasic, signOut } from 'app';
import { useDeleteUsersMutation, useUpdateUsersMutation } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'store';

type PropsType = {
  userIds: string[];
  page: number;
  limit: number;
  setSelectedUserIds: (userIds: string[]) => void;
};

export const AdminToolbar: FC<PropsType> = ({
  userIds,
  limit,
  page,
  setSelectedUserIds,
}) => {
  const { t } = useTranslation();
  const [
    updateUsers,
    { data: usersData, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateUsersMutation();

  const [deleteUsers, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] =
    useDeleteUsersMutation();
  const dispatch = useAppDispatch();
  const signedInUserId = useAppSelector(selectUserId);
  const isDisabled = userIds.length === 0 || isUpdateLoading || isDeleteLoading;

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedUserIds([]);
    }
  }, [dispatch, isDeleteSuccess, setSelectedUserIds, signedInUserId]);

  useEffect(() => {
    if (isDeleteSuccess) {
      if (userIds.includes(signedInUserId)) {
        dispatch(
          setError({
            title: t('error_title_accountExists'),
            message: t('error_message_accountExists'),
          }),
        );
        dispatch(signOut());
      }
    }
  }, [dispatch, isDeleteSuccess, setSelectedUserIds, signedInUserId, t, userIds]);

  useEffect(() => {
    if (isUpdateSuccess && usersData) {
      if (userIds.includes(signedInUserId) && usersData.users[0].access === 'basic')
        dispatch(setUserAccessBasic());
      if (userIds.includes(signedInUserId) && usersData.users[0].status === 'blocked') {
        dispatch(
          setError({
            title: t('error_title_userStatus'),
            message: t('error_message_userStatus'),
          }),
        );
        dispatch(signOut());
      }
    }
  }, [dispatch, isUpdateSuccess, signedInUserId, t, userIds, usersData]);

  const onBlockUsersClick = (): void => {
    updateUsers({ userIds, update: { status: 'blocked' }, pageInfo: { limit, page } });
  };
  const onUnblockUsersClick = (): void => {
    updateUsers({ userIds, update: { status: 'active' }, pageInfo: { limit, page } });
  };

  const onAdminUsersClick = (): void => {
    updateUsers({ userIds, update: { access: 'admin' }, pageInfo: { limit, page } });
  };

  const onBasicUsersClick = (): void => {
    updateUsers({ userIds, update: { access: 'basic' }, pageInfo: { limit, page } });
  };
  const onDeleteUsersClick = (): void => {
    deleteUsers({ userIds, limit, page });
  };

  return (
    <Group spacing="xs">
      <ActionIcon
        variant="filled"
        title={t('button_title_blockUser')}
        color="orange"
        size={30}
        disabled={isDisabled}
        onClick={onBlockUsersClick}
      >
        <IconLock size={18} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        title={t('button_title_unBlockUser')}
        color="green"
        size={30}
        disabled={isDisabled}
        onClick={onUnblockUsersClick}
      >
        <IconLockOpen size={18} />
      </ActionIcon>

      <Button
        variant="filled"
        size="xs"
        title={t('button_title_adminRights')}
        color="yellow"
        disabled={isDisabled}
        onClick={onAdminUsersClick}
      >
        {t('button_text_admin')}
      </Button>

      <Button
        variant="default"
        size="xs"
        title={t('button_title_basicRights')}
        disabled={isDisabled}
        onClick={onBasicUsersClick}
      >
        {t('button_text_basic')}
      </Button>
      <Button
        variant="filled"
        color="red"
        size="xs"
        title={t('button_title_deleteUser')}
        disabled={isDisabled}
        onClick={onDeleteUsersClick}
      >
        {t('button_text_delete')}
      </Button>
    </Group>
  );
};
