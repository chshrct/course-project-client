import { FC, useEffect } from 'react';

import { Box } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import LoginGithub from 'react-login-github';

import s from './style/GithubSignIn.module.css';

import { useGithubSignInMutation } from 'api';
import { selectColorScheme, setRememberMe } from 'app';
import { useAppDispatch, useAppSelector } from 'store';

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

type PropsType = {
  rememberMe: boolean;
  setOpened: (val: boolean) => void;
};

export const GithubSignIn: FC<PropsType> = ({ rememberMe, setOpened }) => {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector(selectColorScheme);
  const isLight = colorScheme === 'light';
  const gitIconColor = isLight ? undefined : 'white';
  const gitButtonClass = isLight ? s.githubButton : s.githubButtonDark;
  const [githubSignIn, { isSuccess }] = useGithubSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRememberMe(rememberMe));
      setOpened(false);
    }
  }, [dispatch, isSuccess, rememberMe, setOpened]);

  const onSuccess = ({ code }: any): void => {
    githubSignIn({ code });
  };
  const onFailure = (response: any): void => console.error(response);

  return (
    <LoginGithub
      className={gitButtonClass}
      type="button"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope="user:email"
    >
      <Box mt={5} title="GitHub">
        <IconBrandGithub color={gitIconColor} size={16} />
      </Box>
    </LoginGithub>
  );
};
