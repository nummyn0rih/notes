import { useParams, useNavigate } from 'react-router-dom';
import { doc, deleteDoc, collection } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useAuthStateUser } from '../../context/AuthProvider';
import { Divider, Modal, Button, Center, Group, Loader, Text, Paper } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { marked } from 'marked';

export function Note() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const { id } = useParams();
  const [user] = useAuthStateUser();
  const uid = user!.uid;
  const [value, loading, error] = useDocument(doc(collection(db, 'users', uid, 'notes'), id));

  const handleChange = () => {
    navigate(`/notes/${id}/edit`);
  };

  const handleDelete = async () => {
    navigate(`/`);
    await deleteDoc(doc(db, 'users', uid, 'notes', id as string));
  }

  const createMarkup = (): string => marked.parse(value?.data()!.text) as string;

  return (
    <Paper shadow="sm" p="xl">
      {error && <strong>Error: {error.message}</strong>}
      {loading && (
        <Center style={{height: "100%"}}>
          <Loader color="blue" size="xl" type="dots"/>
        </Center>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Подтвердите удаление заметки"
        centered
        size="xs"
        fullScreen={isMobile}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        transitionProps={{ transition: 'fade', duration: 450, timingFunction: 'linear' }}
      >
        <Center mt={10}>
          <Button 
            leftSection={<IconTrash size={20} />}
            radius="xl"
            variant="gradient"
            aria-label="Gradient action icon"
            gradient={{ from: 'yellow', to: 'pink', deg: 45 }}
            onClick={handleDelete}
            >
              Удалить
        </Button>
        </Center>
      </Modal>
      {value && (
        <>
          <Group justify="space-between" mb={20}>
            <Button
              leftSection={<IconPencil size={20} />}
              radius="xl"
              variant="gradient"
              aria-label="Gradient action icon"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              onClick={handleChange}
              >
              Редактировать
            </Button>
            <Button 
              leftSection={<IconTrash size={20} />}
              radius="xl"
              variant="gradient"
              aria-label="Gradient action icon"
              gradient={{ from: 'yellow', to: 'pink', deg: 45 }}
              onClick={open}
              >
              Удалить
            </Button>
          </Group>
          <Text truncate="end" size="xl">{value?.data()!.header}</Text>
          <Divider my="md" />
          <Text truncate="end" dangerouslySetInnerHTML={{ __html: createMarkup() }} />
        </>
      )}
    </Paper>
  )
}
