import { useNavigate } from 'react-router-dom';
import { Button, Group } from '@mantine/core';
import { useAuth } from '../../context/AuthProvider';

export function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit() {
    auth.signout(() => {
      navigate('/', { replace: true });
    });
  }

  return (
    <Group>
      <p>{auth.user.email}</p>
      <Button radius="xl" onClick={handleSubmit}>Sign out</Button>
    </Group>
  )
}
