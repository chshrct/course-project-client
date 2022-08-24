import { FC, ReactNode } from 'react';

import { Group, Text } from '@mantine/core';

type PropsType = {
  children: ReactNode;
};

export const WithStar: FC<PropsType> = ({ children }) => {
  return (
    <Group spacing={0}>
      {children}
      <Text color="red">*</Text>
    </Group>
  );
};
