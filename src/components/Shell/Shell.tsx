import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, ScrollArea, Button, Burger, Group, Skeleton, Card, Text, Paper } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { Header } from '../Header';

export function Shell() {
  const [opened, { toggle }] = useDisclosure();

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
          {Array(25)
            .fill(0)
            .map((_, index) => (
              // <Skeleton key={index} h={28} mt="sm" />
              <Card
                key={index}
                withBorder
                px={15}
                py={10}
                mb="xs"
                shadow="sm"
                component="a"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                <Text>
                  You&apos;ve won a million dollars in cash!
                </Text>
                <Text c="dimmed" size="sm">
                  Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                </Text>
              </Card>
          ))}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Paper shadow="sm" p="xl">
          <Group justify="space-between" mb={20}>
            <Button
              leftSection={<IconPencil size={20} />}
              radius="xl"
              variant="gradient"
              aria-label="Gradient action icon"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              Редактировать
            </Button>

            <Button 
              leftSection={<IconTrash size={20} />}
              radius="xl"
              variant="gradient"
              aria-label="Gradient action icon"
              gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
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
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}