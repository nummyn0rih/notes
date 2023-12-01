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
  console.log('values === ', values)

  const handleClick = (id: string) => () => {
    navigate(`/notes/${id}`);
  };

  const handleAddNewNote = async () => {
    const note = {
      header: "5",
      text: "The earth of every kind bearing fruit with the seed in it. And God saw that the tree of life. And let the dry land Earth, and the tree of life also in the earth and no herb of the sea and over the face of the deep, while a wind from God swept over the night, and to separate the day and over the cattle, and over the cattle, and over every creeping thing that moves upon the earth. Then the LORD God had taken from the presence of the LORD God said, Let us make humankind in our image, according to our likeness; and let them be lights in the garden at the time of the LORD God had taken from the tree, and I ate. And God said, Let the waters swarm, and every winged bird of the air, and brought her to the man. God made the two great lights - the greater light to rule the day that the man should be alone; I will greatly increase your pangs in childbearing; in pain you shall not eat, for in the day and over all the days of your life. So God created the heavens and the earth of every kind, and everything that creeps on the earth.",
      changed: Timestamp.fromDate(new Date())
    };

    try {
      const docRef = await addDoc(collection(db, 'users', uid, 'notes'), note);
      console.log("Document written with ID: ", docRef.id);
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

          {error && <strong>Error: {JSON.stringify(error)}</strong>}
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
              <Text>{JSON.stringify(doc.data().header)}</Text>
              <Text c="dimmed" size="sm">{new Date(JSON.stringify(doc.data().changed.nanoseconds)).toLocaleString()}</Text>
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