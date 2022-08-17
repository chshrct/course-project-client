import { FC, useEffect } from 'react';

import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { useSignUpMutation } from 'shared/api';

type PropsType = {
  setHasAccount: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignUpForm: FC<PropsType> = ({ setHasAccount }) => {
  const { t } = useTranslation();
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: value => (value ? null : t('error_required')),
      email: value => (/^\S+@\S+$/.test(value) ? null : t('error_email')),
      password: value => (value.length >= PASSWORD_LENGTH ? null : t('error_password')),
      confirmPassword: (value, values) =>
        value === values.password ? null : t('error_confirm_password'),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setHasAccount(true);
    }
  }, [form, isSuccess, setHasAccount]);

  const onSignUpSubmit = ({ email, name, password }: typeof form.values): void => {
    signUp({ email, name, password });
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onSignUpSubmit)}>
        <TextInput
          required
          label={t('label_name')}
          placeholder={t('placeholder_name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="md"
          required
          label={t('label_email')}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          required
          placeholder="123456"
          label={t('label_password')}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="md"
          required
          placeholder="123456"
          label={t('label_confirm_password')}
          {...form.getInputProps('confirmPassword')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{t('button_signUp')}</Button>
        </Group>
      </form>
      <Space h="xl" />
      <Center>
        <Text>
          <Anchor
            component="button"
            type="button"
            onClick={() => {
              setHasAccount(true);
            }}
          >
            {t('button_signIn')}
          </Anchor>{' '}
          {t('button_text_signIn')}
        </Text>
      </Center>
    </Box>
  );
};
