import { useDisclosure } from '@mantine/hooks';
import { AppShell, ScrollArea, Burger, Group, Skeleton } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="flex-end">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ScrollArea
          mr={-10}
          offsetScrollbars
          scrollbarSize={10}
          scrollHideDelay={500}
        >
          {Array(25)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}