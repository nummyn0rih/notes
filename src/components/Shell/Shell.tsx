import { Outlet, useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuthStateUser } from '../../context/AuthProvider';
import { db } from '../../firebase';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, ScrollArea, Burger, Group, Skeleton, Card, Text,Button } from '@mantine/core';
import { Header } from '../Header';

import { useCollection } from 'react-firebase-hooks/firestore';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const [user] = useAuthStateUser();
  const uid = user!.uid;
  const [values, loading, error] = useCollection(collection(db, 'users', uid, 'notes'));

  const handleClick = (id: string) => () => {
    navigate(`/notes/${id}`);
  };

  const handleAddNewNote = async () => {
    const note = {
      header: '',
      text: '',
      changed: Timestamp.now()
    };

    try {
      const docRef = await addDoc(collection(db, 'users', uid, 'notes'), note);
      console.log("Document written with ID: ", docRef.id);
      navigate(`/notes/${docRef.id}/edit`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
          <Button
            fullWidth
            size="lg"
            radius="xl"
            variant="gradient"
            aria-label="Gradient action icon"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            onClick={handleAddNewNote}
          >
            Добавить новую заметку
          </Button>

          {error && <strong>Error: {error.message}</strong>}
          {loading && Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={65} mt="sm" animate={false} />
          ))}
          {values && values.docs.map((doc) => (
            <Card
              key={doc.id}
              withBorder
              px={15}
              py={10}
              mt="xs"
              shadow="sm"
              component="a"
              onClick={handleClick(doc.id)}
            >
              <Text truncate="end" maw={300}>{doc.data().header}</Text>
              <Text c="dimmed" size="sm">{new Date(doc.data().changed.seconds * 1000).toLocaleString()}</Text>
            </Card>
          ))
          }
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}