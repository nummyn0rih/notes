import { Paper, Stack, Textarea } from '@mantine/core';

export function EditNote() {


  return (
    <Paper shadow="sm" p="xl">
      <Stack>
        <Textarea autosize maxRows={1} size="xl" />
        <Textarea autosize minRows={30} />
      </Stack>
    </Paper>
  )
}
