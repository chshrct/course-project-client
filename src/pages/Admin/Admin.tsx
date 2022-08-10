import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import {
  Center,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Stack,
  Table,
} from '@mantine/core';

import { AdminToolbar } from './AdminToolbar';

import { useGetUsersQuery } from 'api';

const DEFAULT_USERS_PAGE_LIMIT = 5;

export const Admin: FC = () => {
  const [limit, setLimit] = useState(DEFAULT_USERS_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data, isFetching: isUsersFetching } = useGetUsersQuery(
    { limit, page },
    { refetchOnMountOrArgChange: true },
  );
  const count = data ? data.count : 0;

  const total = Math.ceil(count / limit);

  useEffect(() => {
    if (data && total < page) setPage(total);
  }, [data, page, total]);

  const usersChecked = data
    ? data.users.every(user => selectedUserIds.includes(user.id))
    : false;

  const onLimitChange = (value: string): void => {
    setLimit(Number(value));
    setPage(1);
  };

  const onUsersChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!data) return;
    if (e.currentTarget.checked) {
      setSelectedUserIds(data.users.map(user => user.id));

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
            <td>{name}</td>
            <td>{email}</td>
            <td>{access}</td>
            <td>{status}</td>
          </tr>
        );
      })
    : [];

  return (
    <Container>
      <Center style={{ minHeight: '100vh' }}>
        <Stack style={{ width: '100%' }}>
          <AdminToolbar
            userIds={selectedUserIds}
            page={page}
            limit={limit}
            setSelectedUserIds={setSelectedUserIds}
          />
          <Stack style={{ position: 'relative' }}>
            <LoadingOverlay visible={isUsersFetching} overlayBlur={2} />
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      size="xs"
                      onChange={onUsersChange}
                      checked={usersChecked}
                      title="Toggle all"
                    />
                  </th>
                  <th>#</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Access</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Stack>

          <Group position="apart">
            {total > 1 && (
              <Pagination
                title="Choose page"
                total={total}
                size="sm"
                page={page}
                onChange={setPage}
                siblings={1}
              />
            )}
            <Select
              title="Choose limit"
              size="xs"
              style={{ width: '70px' }}
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
    </Container>
  );
};
