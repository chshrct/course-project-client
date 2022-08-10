import { FC, useEffect } from 'react';

import { ActionIcon, Button, Group } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons';

import {
  useDeleteUsersMutation,
  useUpdateUsersAccessMutation,
  useUpdateUsersStatusMutation,
} from 'api';

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
  const [updateUsersStatus, { isLoading: isStatusLoading }] =
    useUpdateUsersStatusMutation();
  const [updateUsersAccess, { isLoading: isAccessLoading }] =
    useUpdateUsersAccessMutation();
  const [deleteUsers, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] =
    useDeleteUsersMutation();

  useEffect(() => {
    if (isDeleteSuccess) setSelectedUserIds([]);
  }, [isDeleteSuccess, setSelectedUserIds]);
  const isDisabled =
    userIds.length === 0 || isStatusLoading || isAccessLoading || isDeleteLoading;

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
        title="Block user"
        color="orange"
        size={30}
        disabled={isDisabled}
        onClick={onBlockUsersClick}
      >
        <IconLock size={18} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        title="Unblock user"
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
        title="Delete user"
        disabled={isDisabled}
        onClick={onDeleteUsersClick}
      >
        Delete
      </Button>
      <Button
        variant="filled"
        size="xs"
        title="Admin rights"
        color="yellow"
        disabled={isDisabled}
        onClick={onAdminUsersClick}
      >
        Admin
      </Button>

      <Button
        variant="default"
        size="xs"
        title="Basic rights"
        disabled={isDisabled}
        onClick={onBasicUsersClick}
      >
        Basic
      </Button>
    </Group>
  );
};
