import { FC, useState } from 'react';

import {
  ActionIcon,
  Button,
  Container,
  Drawer,
  Group,
  Header,
  Text,
} from '@mantine/core';
import {
  IconAlphabetCyrillic,
  IconAlphabetLatin,
  IconMoonStars,
  IconSearch,
  IconSun,
} from '@tabler/icons';

import { SignInForm } from './SignInForm/SignInForm';
import { SignUpForm } from './SignUpForm/SignUpForm';

import {
  selectColorScheme,
  selectLanguage,
  toggleColorScheme,
  toggleLanguage,
} from 'app';
import { useAppDispatch, useAppSelector } from 'store';

export const AppHeader: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const isDark = colorScheme === 'dark';
  const isEnglish = language === 'en';

  return (
    <>
      <Header height={52} p="sm">
        <Container>
          <Group align="center" position="apart" noWrap>
            <Text>Head</Text>
            <Group spacing="xs">
              <Button
                color={isDark ? 'gray' : 'dark'}
                variant="default"
                sx={{ width: '100px' }}
                size="xs"
                p={0}
                title="Search items"
              >
                <Group position="right">
                  <IconSearch size={16} color="gray" />
                  <Text size={14} color="dimmed">
                    Search
                  </Text>
                </Group>
              </Button>
              <ActionIcon
                variant="default"
                onClick={() => dispatch(toggleLanguage())}
                title={isEnglish ? 'Russian' : 'English'}
                size={30}
              >
                {isEnglish ? (
                  <IconAlphabetLatin size={18} />
                ) : (
                  <IconAlphabetCyrillic size={18} />
                )}
              </ActionIcon>
              <ActionIcon
                variant="default"
                onClick={() => dispatch(toggleColorScheme())}
                title="Toggle color scheme"
                size={30}
              >
                {isDark ? (
                  <IconSun size={18} color="Orange" />
                ) : (
                  <IconMoonStars size={18} />
                )}
              </ActionIcon>
              <Button
                variant="default"
                color={isDark ? 'gray' : 'dark'}
                size="xs"
                p={5}
                title="Sign in/up"
                onClick={() => setOpened(true)}
              >
                Sign in/up
              </Button>
            </Group>
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={hasAccount ? 'Sign in' : 'Sign up'}
        padding="xl"
        size="xl"
        position="right"
      >
        {hasAccount ? (
          <SignInForm setHasAccount={setHasAccount} />
        ) : (
          <SignUpForm setHasAccount={setHasAccount} />
        )}
      </Drawer>
    </>
  );
};
