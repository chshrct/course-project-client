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

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

import {
  selectIsDark,
  selectIsEnglish,
  selectIsSignedIn,
  selectUserName,
  signOut,
  toggleColorScheme,
  toggleLocale,
} from 'app';
import { useAppDispatch, useAppSelector } from 'store';

export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const userName = useAppSelector(selectUserName);
  const isDark = useAppSelector(selectIsDark);
  const isEnglish = useAppSelector(selectIsEnglish);
  const isSignedInHeaderMessage = `Hi! Nice to meet you, ${userName}`;

  const [hasAccount, setHasAccount] = useState(true);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Header height={52} p="sm" style={{ position: 'absolute' }}>
        <Container>
          <Group align="center" position="apart" noWrap>
            <Text>{isSignedIn && isSignedInHeaderMessage}</Text>
            <Group spacing="xs">
              <Button
                color={isDark ? 'gray' : 'dark'}
                variant="default"
                sx={{ width: '100px' }}
                size="xs"
                p={0}
                title="Search for items"
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
                onClick={() => dispatch(toggleLocale())}
                title={isEnglish ? 'Russian' : 'English'}
                size={30}
              >
                {isEnglish ? (
                  <IconAlphabetCyrillic size={18} />
                ) : (
                  <IconAlphabetLatin size={18} />
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
              {isSignedIn ? (
                <Button
                  variant="default"
                  color={isDark ? 'gray' : 'dark'}
                  size="xs"
                  p={5}
                  title="Sign out"
                  onClick={() => dispatch(signOut())}
                >
                  Sign out
                </Button>
              ) : (
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
              )}
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
          <SignInForm setHasAccount={setHasAccount} setOpened={setOpened} />
        ) : (
          <SignUpForm setHasAccount={setHasAccount} />
        )}
      </Drawer>
    </>
  );
};
