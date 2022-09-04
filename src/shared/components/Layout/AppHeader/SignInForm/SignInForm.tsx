import { FC, useEffect } from 'react';

import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { GithubSignIn } from './GithubSignIn';
import { GoogleSignIn } from './GoogleSignIn';
import s from './style/SignInForm.module.css';

import { setRememberMe } from 'app';
import { useSignInMutation } from 'shared/api';
import { WithStar } from 'shared/components/WithStar';
import { useAppDispatch } from 'store';

type PropsType = {
  setHasAccount: (val: boolean) => void;
  setOpened: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignInForm: FC<PropsType> = ({ setHasAccount, setOpened }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [signIn, { isSuccess, isLoading }] = useSignInMutation();

  const signInSchema = Yup.object().shape({
    email: Yup.string().email(t('error_email')).required(t('error_required')),
    password: Yup.string()
      .min(PASSWORD_LENGTH, t('error_password'))
      .required(t('error_required')),
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: yupResolver(signInSchema),
  });

  const { setValues } = form;

  useEffect(() => {
    if (isSuccess) {
      setOpened(false);
      setValues({
        email: '',
        password: '',
        rememberMe: false,
      });
    }
  }, [isSuccess, setOpened, setValues]);

  const onSignInSubmit = ({ email, password, rememberMe }: typeof form.values): void => {
    signIn({ email, password });
    dispatch(setRememberMe(rememberMe));
  };

  return (
    <Box className={s.width300} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <form onSubmit={form.onSubmit(onSignInSubmit)}>
        <TextInput
          label={<WithStar>{t('label_email')}</WithStar>}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder="123456"
          label={<WithStar>{t('label_password')}</WithStar>}
          mt="md"
          {...form.getInputProps('password')}
        />

        <Group position="apart" mt="md" align="center">
          <Button type="submit">{t('button_signIn')}</Button>
          <Checkbox
            label={t('label_rememberMe')}
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
          />
        </Group>
      </form>
      <Space h="md" />
      <Group>
        <GoogleSignIn signIn={signIn} rememberMe={form.values.rememberMe} />
        <GithubSignIn rememberMe={form.values.rememberMe} setOpened={setOpened} />
      </Group>
      <Space h="xl" />
      <Center>
        <Text>
          <Anchor
            component="button"
            type="button"
            onClick={() => {
              setHasAccount(false);
            }}
          >
            {t('button_signUp')}
          </Anchor>{' '}
          {t('button_text_signUp')}
        </Text>
      </Center>
    </Box>
  );
};
