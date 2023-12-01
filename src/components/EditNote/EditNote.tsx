import { useParams } from 'react-router-dom';
import { doc, collection, setDoc, Timestamp } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useAuthStateUser } from '../../context/AuthProvider';

import { Center, Loader, Paper, Stack, Textarea } from '@mantine/core';
import { useState } from 'react';

export function EditNote() {
  const { id } = useParams();
  const [user] = useAuthStateUser();
  const uid = user!.uid;
  const [value, loading, error] = useDocument(doc(collection(db, 'users', uid, 'notes'), id));

  const [noteHeader, setNoteHeader] = useState(JSON.stringify(value?.data()!.header));
  const [noteText, setNoteText] = useState(JSON.stringify(value?.data()!.text) || '');
  // console.log('id => ', id, 'uid => ', uid)


  if (value) {
    // console.log(JSON.stringify(value.data()))
  }

  // JSON.stringify(value.data()!.header)
  // JSON.stringify(value.data()!.text)

  async function update(note) {
    try {
      const docRef = doc(db, 'users', uid, 'notes', id as string);
      await setDoc(docRef, note);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const id = e.target.id;
    const note = {
      header: id === 'noteHeader' ? e.target.value : noteHeader,
      text: id === 'noteText' ? e.target.value : noteText,
      changed: Timestamp.fromDate(new Date())
    };

    if (id === 'noteHeader') {
      setNoteHeader(e.target.value);
    }

    if (id === 'noteText') {
      setNoteText(e.target.value);
    }

    update(note);
  }

  return (
    <Paper shadow="sm" p="xl">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <Center style={{height: "100%"}}>
          <Loader color="blue" size="xl" type="dots"/>
        </Center>
      )}
      {value && (
        <Stack>
          <Textarea autosize maxRows={1} onChange={handleChange} value={noteHeader} size="xl" id='noteHeader' />
          <Textarea autosize minRows={30} onChange={handleChange} value={noteText} id='noteText' />
        </Stack>
      )
      }
    </Paper>
  )
}
