import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Space,
  Stack,
  Table,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronRight, IconUserCircle } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AdminToolbar } from './AdminToolbar';
import s from './style/Admin.module.css';

import { useGetUsersQuery } from 'api';
import { selectUserAccess, setError } from 'app';
import { DEFAULT_PAGE_LIMIT } from 'constant';
import { APP_ROUTES } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

export const Admin: FC = () => {
  const { t } = useTranslation();
  const userAccess = useAppSelector(selectUserAccess);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data, isFetching: isUsersFetching } = useGetUsersQuery(
    { limit, page },
    { refetchOnMountOrArgChange: true },
  );
  const count = data ? data.count : 0;
  const total = Math.ceil(count / limit);
  const areUsersChecked = data
    ? data.users.every(({ id }) => selectedUserIds.includes(id))
    : false;

  useEffect(() => {
    if (data && total < page) setPage(total);
  }, [data, page, total]);

  const onLimitChange = (value: string): void => {
    setLimit(Number(value));
    setPage(1);
  };

  const onUsersChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!data) return;
    if (e.currentTarget.checked) {
      setSelectedUserIds(data.users.map(({ id }) => id));

      return;
    }
    setSelectedUserIds(
      selectedUserIds.filter(id => data.users.every(user => user.id !== id)),
    );
  };

  const rows = data?.users
    ? data.users.map(({ id, name, email, access, status }, index) => {
        const userChecked = selectedUserIds.includes(id);
        const userIndex = limit * (page - 1) + index + 1;

        const onUserChange: ChangeEventHandler<HTMLInputElement> = e =>
          e.currentTarget.checked
            ? setSelectedUserIds(ids => [...ids, id])
            : setSelectedUserIds(ids => ids.filter(userId => userId !== id));

        return (
          <tr key={id}>
            <td>
              <Checkbox size="xs" onChange={onUserChange} checked={userChecked} />
            </td>
            <td>{userIndex}</td>
            <td>{id}</td>
            <td>
              <UnstyledButton onClick={() => navigate(`${APP_ROUTES.USER}/${id}`)}>
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
            <td>{t(access === 'admin' ? 'text_access_admin' : 'text_access_basic')}</td>
            <td>
              {t(status === 'active' ? 'text_access_active' : 'text_access_blocked')}
            </td>
          </tr>
        );
      })
    : [];

  useEffect(() => {
    if (userAccess === 'basic') {
      navigate(APP_ROUTES.MAIN);
      dispatch(
        setError({
          title: t('error_title_userAccess'),
          message: t('error_message_userAccess'),
        }),
      );
    }
  }, [dispatch, navigate, t, userAccess]);

  return (
    <Container size="xl">
      <Center className={s.conteinerHeight}>
        <Stack className={s.widthFull}>
          <AdminToolbar
            userIds={selectedUserIds}
            page={page}
            limit={limit}
            setSelectedUserIds={setSelectedUserIds}
          />
          <Stack className={s.positionRelative}>
            <LoadingOverlay visible={isUsersFetching} overlayBlur={2} />
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      size="xs"
                      onChange={onUsersChange}
                      checked={areUsersChecked}
                      title={t('button_title_toggleAll')}
                    />
                  </th>
                  <th>#</th>
                  <th>Id</th>
                  <th>{t('label_name')}</th>
                  <th>{t('label_email')}</th>
                  <th>{t('title_access')}</th>
                  <th>{t('title_status')}</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Stack>

          <Group position="apart">
            {total > 1 && (
              <Pagination
                title={t('button_title_choosePage')}
                total={total}
                size="sm"
                page={page}
                onChange={setPage}
                siblings={1}
              />
            )}
            <Select
              title={t('button_title_pageSize')}
              size="xs"
              className={s.width70}
              value={String(limit)}
              onChange={onLimitChange}
              data={[
                { value: '1', label: '1' },
                { value: '5', label: '5' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
              ]}
            />
          </Group>
        </Stack>
      </Center>
      <Space h="md" />
    </Container>
  );
};
