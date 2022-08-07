import { FC } from 'react';

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
} from '@mantine/core';
import { useForm } from '@mantine/form';

type PropsType = {
  setHasAccount: (val: boolean) => void;
};

const PASSWORD_LENGTH = 6;

export const SignInForm: FC<PropsType> = ({ setHasAccount }) => {
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

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(values => console.log(values))}>
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
          <Button type="submit">Submit</Button>
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
