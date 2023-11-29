import { Button, Group, Text, Paper } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { addDoc, collection, doc, deleteDoc, setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthProvider';

import { useParams } from 'react-router-dom';


export function Note() {
  const auth = useAuth();

  const { id } = useParams();
  console.log(id)

  const uid = auth.user.uid;

  const handleAdd = async () => {
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
  
  const handleChange = async () => {
    const note = {
      header: "five note",
      text: "The earth of every kind bearing fruit with the seed in it. And God saw that the tree of life. And let the dry land Earth, and the tree of life also in the earth and no herb of the sea and over the face of the deep, while a wind from God swept over the night, and to separate the day and over the cattle, and over the cattle, and over every creeping thing that moves upon the earth. Then the LORD God had taken from the presence of the LORD God said, Let us make humankind in our image, according to our likeness; and let them be lights in the garden at the time of the LORD God had taken from the tree, and I ate. And God said, Let the waters swarm, and every winged bird of the air, and brought her to the man. God made the two great lights - the greater light to rule the day that the man should be alone; I will greatly increase your pangs in childbearing; in pain you shall not eat, for in the day and over all the days of your life. So God created the heavens and the earth of every kind, and everything that creeps on the earth.",
      changed: Timestamp.fromDate(new Date())
    };

    try {
      const docRef = doc(db, 'users', uid, 'notes', id as string);
      await setDoc(docRef, note);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'users', uid, 'notes', id as string));
  }

  return (
    <Paper shadow="sm" p="xl">
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
          leftSection={<IconPencil size={20} />}
          radius="xl"
          variant="gradient"
          aria-label="Gradient action icon"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          onClick={handleAdd}
        >
          Добавить
        </Button>

        <Button 
          leftSection={<IconTrash size={20} />}
          radius="xl"
          variant="gradient"
          aria-label="Gradient action icon"
          gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </Group>
      <Text>
Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

{'>'} The overriding design goal for Markdown's
{'>'} formatting syntax is to make it as readable
{'>'} as possible. The idea is that a
{'>'} Markdown-formatted document should be
{'>'} publishable as-is, as plain text, without
{'>'} looking like it's been marked up with tags
{'>'} or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/
      </Text>
    </Paper>
  )
}
