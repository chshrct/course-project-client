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

import { useSignUpMutation } from 'api';

type PropsType = {
  setHasAccount: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignUpForm: FC<PropsType> = ({ setHasAccount }) => {
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: value => (value ? null : 'Name required'),
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value =>
        value.length >= PASSWORD_LENGTH ? null : 'Password length should be 6 and more',
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
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
          label="Name"
          placeholder="Alesha Popovich"
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="md"
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          required
          placeholder="123456"
          label="Password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="md"
          required
          placeholder="123456"
          label="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Sign up</Button>
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
            Sign in
          </Anchor>{' '}
          if you have an account
        </Text>
      </Center>
    </Box>
  );
};
