import { useNavigate } from 'react-router-dom';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { useAuth, User, useAuthStateUser } from '../../context/AuthProvider';
import { GoogleButton } from './GoogleButton';

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [user] = useAuthStateUser();

  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  function handleSubmit({ email, password }: User) {
    if (type === 'login') {
      auth.signin(email, password, () => {
        navigate('/', { replace: true });
      });
    }

    if (type === 'register') {
      auth.signup(email, password, () => {
        navigate('/', { replace: true });
      });
    }
  }

  if (user) {
    navigate('/', { replace: true });
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Group gap={5}>
        <Text size="lg" fw={500}>Welcome to</Text>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="xl"
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          notes,
        </Text>
        <Text size="lg" fw={500}>{type} with
        </Text>
      </Group>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
