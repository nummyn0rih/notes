import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, ScrollArea, Burger, Group, Skeleton, Card, Text } from '@mantine/core';
import { Header } from '../Header';

import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthProvider';

interface Note {
  id: string;
  data: {
    header: string,
    text: string,
    changed: {
      nanoseconds: number,
      seconds: number
    }
  }
}

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const [notes, setNotes] = useState<Note[] | []>([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const uid = auth.user.uid;

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users", uid, "notes"));
    const data: Note[] = [];

    querySnapshot.forEach((doc) => {
      const note = { id: doc.id, data: doc.data() } as Note;
      data.push(note);
    });

    setNotes(data);
  }, [uid])

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [fetchData])
  
  const handleClick = (id: string) => () => {
    navigate(`/notes/${id}`);
  };

  console.log(notes)

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
          {
            notes.length !== 0 ? (
              notes.map((note) => (
                <Card
                  key={note.id}
                  withBorder
                  px={15}
                  py={10}
                  mb="xs"
                  shadow="sm"
                  component="a"
                  onClick={handleClick(note.id)}
                >
                  <Text>{note.data.header}</Text>
                  <Text c="dimmed" size="sm">{new Date(note.data.changed.nanoseconds).toLocaleString()}</Text>
                </Card>
              ))) : (
                Array(15)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} h={28} mt="sm" animate={false} />
                  ))
              )
          }
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}