import { FC, useState } from 'react';

import {
  ActionIcon,
  Button,
  Container,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Text,
} from '@mantine/core';
import {
  IconAlphabetCyrillic,
  IconAlphabetLatin,
  IconHome,
  IconMoonStars,
  IconSearch,
  IconSun,
} from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

import {
  selectIsAdmin,
  selectIsDark,
  selectIsEnglish,
  selectIsSignedIn,
  signOut,
  toggleColorScheme,
  toggleLocale,
} from 'app';
import { APP_ROUTES } from 'routes/enums';
import { useAppDispatch, useAppSelector } from 'store';

export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isDark = useAppSelector(selectIsDark);
  const isEnglish = useAppSelector(selectIsEnglish);

  const [hasAccount, setHasAccount] = useState(true);
  const [opened, setOpened] = useState(false);

  return (
    <Header height={52} p="sm" style={{ position: 'fixed' }}>
      <Container>
        <Group align="center" position="apart" noWrap>
          <ActionIcon
            variant="transparent"
            onClick={() => navigate(APP_ROUTES.MAIN)}
            title="Home page"
            size={30}
          >
            <IconHome size={18} />
          </ActionIcon>
          <Group spacing="xs">
            <Button
              color={isDark ? 'gray' : 'dark'}
              variant="default"
              size="xs"
              p={5}
              title="Search for items"
            >
              <Group position="right">
                <IconSearch size={16} color="gray" />
                <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                  <Text size={14} color="dimmed">
                    Search
                  </Text>
                </MediaQuery>
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
            {isAdmin && (
              <Button
                variant="default"
                color={isDark ? 'gray' : 'dark'}
                size="xs"
                p={5}
                title="Admin panel"
                onClick={() => navigate(APP_ROUTES.ADMIN)}
              >
                Admin panel
              </Button>
            )}
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
                Sign in
              </Button>
            )}
          </Group>
        </Group>
      </Container>
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
    </Header>
  );
};
