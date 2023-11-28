import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, ScrollArea, Burger, Group, Skeleton, Card, Text } from '@mantine/core';
import { Header } from '../Header';

import data from '../../data.json';


export function Shell() {
  const [opened, { toggle }] = useDisclosure();

  console.log(data)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 400, breakpoint: 'sm', collapsed: { mobile: !opened } }}
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
          {data.notes
            .map((note) => (
              // <Skeleton key={note.id} h={28} mt="sm" />
              <Card
                key={note.id}
                withBorder
                px={15}
                py={10}
                mb="xs"
                shadow="sm"
                component="a"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                <Text>{note.name}</Text>
                <Text c="dimmed" size="sm">{note.date}</Text>
              </Card>
          ))}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}