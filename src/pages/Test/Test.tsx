import { FC } from 'react';

import { ActionIcon, Container, Text } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

import { toggleColorScheme } from 'app/appSlice/appSlice';
import { selectColorScheme } from 'app/appSlice/selectors';
import { useAppDispatch, useAppSelector } from 'store';

export const Test: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const dispatch = useAppDispatch();
  const isDark = colorScheme === 'dark';

  return (
    <Container>
      <Text>Welcome to Mantine!</Text>
      <ActionIcon
        variant="outline"
        color={isDark ? 'yellow' : 'blue'}
        onClick={() => dispatch(toggleColorScheme())}
        title="Toggle color scheme"
      >
        {isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    </Container>
  );
};
