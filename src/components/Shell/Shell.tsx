import { useDeferredValue, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthStateUser } from '../../context/AuthProvider';
import { db } from '../../firebase';
import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Button,
  Card,
  CloseButton,
  Group,
  ScrollArea,
  Skeleton,
  Text,
  Input,
} from '@mantine/core';
import { Header } from '../Header';
import { Note } from '../types';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const [user] = useAuthStateUser();
  const uid = user!.uid;

  const [values, loading, error] = useCollection(collection(db, 'users', uid, 'notes'));
  const notes = values?.docs.map((doc) => {
    const data = doc.data() as Note;
    return { id: doc.id, ...data };
  });

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useEffect(() => {
    const ids = notes?.filter((note) => {
      if (note.header.toLocaleLowerCase().includes(deferredQuery)) {
        return note;
      }
      if (note.text.toLocaleLowerCase().includes(deferredQuery)) {
        return note;
      }
    }).map((note) => note.id) as string[];

    setSearchResult(ids);
  }, [deferredQuery]);

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

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 400, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Input
            placeholder='Поиск'
            value={query}
            onChange={handleChangeSearchQuery}
            w={367}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setQuery('')}
                style={{ display: query ? undefined : 'none' }}
              />
            }
          />
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Header />
          </Group>
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

          {notes && !query && notes.map((note) => (
            <Card
              key={note.id}
              withBorder
              px={15}
              py={10}
              mt="xs"
              shadow="sm"
              component="a"
              onClick={handleClick(note.id)}
            >
              <Text truncate="end" maw={300}>{note.header}</Text>
              <Text c="dimmed" size="sm">{new Date(note.changed.seconds * 1000).toLocaleString()}</Text>
            </Card>
          ))}

          {notes && query && notes.map((note) => {
            if (searchResult?.includes(note.id)) {
              return (
                <Card
                  key={note.id}
                  withBorder
                  px={15}
                  py={10}
                  mt="xs"
                  shadow="sm"
                  component="a"
                  onClick={handleClick(note.id)}
                >
                  <Text truncate="end" maw={300}>{note.header}</Text>
                  <Text c="dimmed" size="sm">{new Date(note.changed.seconds * 1000).toLocaleString()}</Text>
                </Card>
            )}

            return;
          })}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}