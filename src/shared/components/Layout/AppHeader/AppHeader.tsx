import { FC, useEffect, useState } from 'react';

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
  IconTableOptions,
  IconUser,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

import {
  selectIsAdmin,
  selectIsDark,
  selectIsEnglish,
  selectIsSignedIn,
  selectUserId,
  signOut,
  toggleColorScheme,
  toggleLocale,
} from 'app';
import { APP_ROUTES } from 'routes/enums';
import { useAppDispatch, useAppSelector } from 'store';

export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const userId = useAppSelector(selectUserId);
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isDark = useAppSelector(selectIsDark);
  const isEnglish = useAppSelector(selectIsEnglish);

  const [hasAccount, setHasAccount] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(isEnglish ? 'en' : 'ru');
  }, [i18n, isEnglish]);

  return (
    <Header height={52} p="sm">
      <Container size="xl">
        <Group align="center" position="apart" noWrap>
          <Group spacing="xs" align="center" position="left">
            <ActionIcon
              variant="transparent"
              onClick={() => navigate(APP_ROUTES.MAIN)}
              title={t('button_title_homePage')}
              size={30}
            >
              <IconHome size={18} />
            </ActionIcon>
            {isSignedIn && (
              <ActionIcon
                variant="transparent"
                onClick={() => navigate(`${APP_ROUTES.USER}/${userId}`)}
                title={t('button_title_userPage')}
                size={30}
              >
                <IconUser size={18} />
              </ActionIcon>
            )}
          </Group>
          <Group spacing="xs">
            <Button color={isDark ? 'gray' : 'dark'} variant="default" size="xs" p={5}>
              <Group position="right">
                <IconSearch size={16} color="gray" />
                <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                  <Text size={14} color="dimmed">
                    {t('button_search')}
                  </Text>
                </MediaQuery>
              </Group>
            </Button>
            <ActionIcon
              variant="default"
              onClick={() => dispatch(toggleLocale())}
              title={t(isEnglish ? 'button_russian' : 'button_english')}
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
              title={t('button_title_toggleColorScheme')}
              size={30}
            >
              {isDark ? (
                <IconSun size={18} color="Orange" />
              ) : (
                <IconMoonStars size={18} />
              )}
            </ActionIcon>
            {isAdmin && (
              <ActionIcon
                variant="default"
                onClick={() => navigate(APP_ROUTES.ADMIN)}
                size={30}
                title={t('button_adminPanel')}
              >
                <IconTableOptions size={18} />
              </ActionIcon>
            )}
            {isSignedIn ? (
              <Button
                variant="default"
                color={isDark ? 'gray' : 'dark'}
                size="xs"
                p={5}
                onClick={() => dispatch(signOut())}
              >
                {t('button_signOut')}
              </Button>
            ) : (
              <Button
                variant="default"
                color={isDark ? 'gray' : 'dark'}
                size="xs"
                p={5}
                onClick={() => setOpened(true)}
              >
                {t('button_signIn')}
              </Button>
            )}
          </Group>
        </Group>
      </Container>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={t(hasAccount ? 'button_signIn' : 'title_signUp')}
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
