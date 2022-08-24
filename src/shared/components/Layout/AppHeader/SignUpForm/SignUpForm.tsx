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
import { useForm, yupResolver } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import s from './style/SignUpForm.module.css';

import { useSignUpMutation } from 'shared/api';
import { WithStar } from 'shared/components/WithStar';

type PropsType = {
  setHasAccount: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignUpForm: FC<PropsType> = ({ setHasAccount }) => {
  const { t } = useTranslation();
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation();

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required(t('error_required')),
    email: Yup.string().email(t('error_email')).required(t('error_required')),
    password: Yup.string()
      .min(PASSWORD_LENGTH, t('error_password'))
      .required(t('error_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('error_confirm_password'))
      .required(t('error_required')),
  });

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: yupResolver(signUpSchema),
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
    <Box className={s.width300} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onSignUpSubmit)}>
        <TextInput
          label={<WithStar>{t('label_name')}</WithStar>}
          placeholder={t('placeholder_name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="md"
          label={<WithStar>{t('label_email')}</WithStar>}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          placeholder="123456"
          label={<WithStar>{t('label_password')}</WithStar>}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="md"
          placeholder="123456"
          label={<WithStar>{t('label_confirm_password')}</WithStar>}
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
