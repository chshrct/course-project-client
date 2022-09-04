import React, { ChangeEventHandler, FC } from 'react';

import { Box, Checkbox, Group, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconUserCircle } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PropsType } from './types';

import { APP_ROUTES } from 'routes';

export const UsersTableRows: FC<PropsType> = ({
  usersData,
  setSelectedUserIds,
  selectedUserIds,
  pageProps: { limit, page },
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <tbody>
      {usersData.users.map(({ id, name, email, access, status }, index) => {
        const isUserChecked = selectedUserIds.includes(id);
        const userIndex = limit * (page - 1) + index + 1;

        const onUserChange: ChangeEventHandler<HTMLInputElement> = e =>
          e.currentTarget.checked
            ? setSelectedUserIds(ids => [...ids, id])
            : setSelectedUserIds(ids => ids.filter(userId => userId !== id));

        const onUserNameClick = (): void => navigate(`${APP_ROUTES.USER}/${id}`);

        const accessText = t(
          access === 'admin' ? 'text_access_admin' : 'text_access_basic',
        );
        const statusText = t(
          status === 'active' ? 'text_access_active' : 'text_access_blocked',
        );

        return (
          <tr key={id}>
            <td>
              <Checkbox size="xs" onChange={onUserChange} checked={isUserChecked} />
            </td>
            <td>{userIndex}</td>
            <td>{id}</td>
            <td>
              <UnstyledButton onClick={onUserNameClick}>
                <Group noWrap align="center">
                  <Box style={{ height: '16px' }}>
                    <IconUserCircle size={16} stroke={1.5} />
                  </Box>

                  {name}
                  <Box>
                    <IconChevronRight size={12} stroke={1.5} />
                  </Box>
                </Group>
              </UnstyledButton>
            </td>
            <td>{email}</td>
            <td>{accessText}</td>
            <td>{statusText}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
