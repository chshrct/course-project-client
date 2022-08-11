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

import { useSignInMutation } from 'api';
import { setRememberMe } from 'app';
import { useAppDispatch } from 'store';

type PropsType = {
  setHasAccount: (val: boolean) => void;
  setOpened: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignInForm: FC<PropsType> = ({ setHasAccount, setOpened }) => {
  const dispatch = useAppDispatch();
  const [signIn, { isSuccess, isLoading }] = useSignInMutation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value =>
        value.length >= PASSWORD_LENGTH ? null : 'Password length should be 6 and more',
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
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          placeholder="123456"
          label="Password"
          mt="md"
          {...form.getInputProps('password')}
        />
        <Checkbox
          mt="md"
          label="Remember me"
          {...form.getInputProps('rememberMe', { type: 'checkbox' })}
        />
        <Group position="right" mt="md">
          <Button type="submit">Sign in</Button>
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
            Sign up
          </Anchor>{' '}
          if you don&apos;t have an account
        </Text>
      </Center>
    </Box>
  );
};
