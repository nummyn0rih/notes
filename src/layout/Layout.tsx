import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

export function Layout(): ReactNode {
  const { height, width } = useViewportSize();

  return (
    <Container fluid h={height} w={width} bg="var(--mantine-color-gray-light)">
      <Outlet />
    </Container>
  );
}
