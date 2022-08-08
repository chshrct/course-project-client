import { FC } from 'react';

import { Center, Container, Stack, Table } from '@mantine/core';

export const Admin: FC = () => {
  return (
    <Container>
      <Center style={{ minHeight: '100vh' }}>
        <Stack style={{ width: '100%' }}>
          <div>Admin</div>
          <Table>
            <thead>
              <tr>
                <th>Element position</th>
                <th>Element name</th>
                <th>Symbol</th>
                <th>Atomic mass</th>
              </tr>
            </thead>
            {/* <tbody>{rows}</tbody> */}
          </Table>
        </Stack>
      </Center>
    </Container>
  );
};
