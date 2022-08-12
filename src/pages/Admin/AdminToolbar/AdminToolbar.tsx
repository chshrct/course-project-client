import { FC, useEffect } from 'react';

import { ActionIcon, Button, Group } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { selectUserId, setUserAccessBasic, signOut } from 'app';
import {
  useDeleteUsersMutation,
  useUpdateUsersAccessMutation,
  useUpdateUsersStatusMutation,
} from 'shared/api';
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
    updateUsersStatus,
    { data: statusData, isLoading: isStatusLoading, isSuccess: isStatusSuccess },
  ] = useUpdateUsersStatusMutation();
  const [
    updateUsersAccess,
    { data: accessData, isLoading: isAccessLoading, isSuccess: isAccessSuccess },
  ] = useUpdateUsersAccessMutation();
  const [deleteUsers, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] =
    useDeleteUsersMutation();
  const dispatch = useAppDispatch();
  const signedInUserId = useAppSelector(selectUserId);
  const isDisabled =
    userIds.length === 0 || isStatusLoading || isAccessLoading || isDeleteLoading;

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedUserIds([]);
    }
  }, [dispatch, isDeleteSuccess, setSelectedUserIds, signedInUserId]);

  useEffect(() => {
    if (isDeleteSuccess) {
      if (userIds.includes(signedInUserId)) dispatch(signOut());
    }
  }, [dispatch, isDeleteSuccess, setSelectedUserIds, signedInUserId, userIds]);

  useEffect(() => {
    if (isAccessSuccess && accessData) {
      if (userIds.includes(signedInUserId) && accessData.access === 'basic')
        dispatch(setUserAccessBasic());
    }
  }, [accessData, dispatch, isAccessSuccess, signedInUserId, userIds]);

  useEffect(() => {
    if (isStatusSuccess && statusData) {
      if (userIds.includes(signedInUserId) && statusData.status === 'blocked')
        dispatch(signOut());
    }
  }, [statusData, dispatch, isStatusSuccess, signedInUserId, userIds]);

  const onBlockUsersClick = (): void => {
    updateUsersStatus({ userIds, status: 'blocked', limit, page });
  };
  const onUnblockUsersClick = (): void => {
    updateUsersStatus({ userIds, status: 'active', limit, page });
  };

  const onAdminUsersClick = (): void => {
    updateUsersAccess({ userIds, access: 'admin', limit, page });
  };

  const onBasicUsersClick = (): void => {
    updateUsersAccess({ userIds, access: 'basic', limit, page });
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
        color="red"
        size="xs"
        title={t('button_title_deleteUser')}
        disabled={isDisabled}
        onClick={onDeleteUsersClick}
      >
        {t('button_text_delete')}
      </Button>
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
    </Group>
  );
};
