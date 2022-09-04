import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { Center, Container, LoadingOverlay, Space, Stack, Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import {
  UsersTableToolbar,
  UsersTableHead,
  UsersTablePagination,
  UsersTableRows,
} from './components';
import { useAccessCheck } from './hooks';
import s from './style/Admin.module.css';

import { useGetUsersQuery } from 'api';
import { selectUserAccess } from 'app';
import { DEFAULT_PAGE_LIMIT } from 'constant';
import { useAppDispatch, useAppSelector } from 'store';

export const Admin: FC = () => {
  const userAccess = useAppSelector(selectUserAccess);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);

  const { data: usersData, isFetching: isUsersFetching } = useGetUsersQuery(
    { limit, page },
    { refetchOnMountOrArgChange: true },
  );
  const pagesCount = usersData ? usersData.count : 0;
  const pagesTotal = Math.ceil(pagesCount / limit);
  const areUsersChecked = usersData
    ? usersData.users.every(({ id }) => selectedUsersIds.includes(id))
    : false;

  useEffect(() => {
    if (usersData && pagesTotal < page) setPage(pagesTotal);
  }, [usersData, page, pagesTotal]);

  useAccessCheck({ dispatch, navigate, userAccess });

  const onLimitChange = (value: string): void => {
    setLimit(Number(value));
    setPage(1);
  };

  const onUsersChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!usersData) return;
    if (e.currentTarget.checked) {
      setSelectedUsersIds(usersData.users.map(({ id }) => id));

      return;
    }
    setSelectedUsersIds(
      selectedUsersIds.filter(selectedUserId =>
        usersData.users.every(({ id }) => id !== selectedUserId),
      ),
    );
  };

  const pageProps = { page, limit };

  return (
    <Container size="xl">
      {usersData && (
        <Center className={s.conteinerHeight}>
          <Stack className={s.widthFull}>
            <UsersTableToolbar
              selectedUsersIds={selectedUsersIds}
              pageProps={pageProps}
              setSelectedUserIds={setSelectedUsersIds}
            />
            <Stack className={s.positionRelative}>
              <LoadingOverlay visible={isUsersFetching} overlayBlur={2} />
              <Table striped highlightOnHover>
                <UsersTableHead
                  areUsersChecked={areUsersChecked}
                  onUsersChange={onUsersChange}
                />
                <UsersTableRows
                  usersData={usersData}
                  selectedUserIds={selectedUsersIds}
                  pageProps={pageProps}
                  setSelectedUserIds={setSelectedUsersIds}
                />
              </Table>
            </Stack>
            <UsersTablePagination
              onLimitChange={onLimitChange}
              pageProps={pageProps}
              setPage={setPage}
              pagesTotal={pagesTotal}
            />
          </Stack>
        </Center>
      )}
      <Space h="md" />
    </Container>
  );
};
