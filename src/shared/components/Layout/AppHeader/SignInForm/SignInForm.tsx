import { FC, useEffect } from 'react';

import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  Space,
  TextInput,
  Text,
  Anchor,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { setRememberMe } from 'app';
import { useSignInMutation } from 'shared/api';
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

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : t('error_email')),
      password: value => (value.length >= PASSWORD_LENGTH ? null : t('error_password')),
    },
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
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <form onSubmit={form.onSubmit(onSignInSubmit)}>
        <TextInput
          required
          label={t('label_email')}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          placeholder="123456"
          label={t('label_password')}
          mt="md"
          {...form.getInputProps('password')}
        />
        <Checkbox
          mt="md"
          label={t('label_rememberMe')}
          {...form.getInputProps('rememberMe', { type: 'checkbox' })}
        />
        <Group position="right" mt="md">
          <Button type="submit">{t('button_signIn')}</Button>
        </Group>
      </form>
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
