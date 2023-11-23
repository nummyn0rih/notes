import { ReactNode } from 'react';
import { Center } from '@mantine/core';
import { AuthenticationForm } from '../components';

export function LoginPage(): ReactNode {
  return (
    <Center style={{height: "100%"}}>
      <AuthenticationForm />
    </Center>
  );
}
