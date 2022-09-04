import { FC, useEffect } from 'react';

import { ActionIcon } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import LoginGithub from 'react-login-github';

import s from './style/GithubSignIn.module.css';

import { setRememberMe } from 'app';
import { useGithubSignInMutation } from 'shared/api';
import { useAppDispatch } from 'store';

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

type PropsType = {
  rememberMe: boolean;
  setOpened: (val: boolean) => void;
};

export const GithubSignIn: FC<PropsType> = ({ rememberMe, setOpened }) => {
  const dispatch = useAppDispatch();
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
      className={s.githubButton}
      type="button"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope="user:email"
    >
      <ActionIcon variant="default" title="GitHub" size={36}>
        <IconBrandGithub size={16} />
      </ActionIcon>
    </LoginGithub>
  );
};
