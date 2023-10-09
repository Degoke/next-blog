import { Text, Avatar, Group } from '@mantine/core';

type PageProps = {
  comment: string
}

export function Comment({ comment }: PageProps) {
  return (
    <div>
      <Group>
      <Avatar radius="xl" />
        <div>
          <Text size="sm">Anonymous User</Text>
        </div>
      </Group>
      <Text pl={54} size="sm">
        {comment}
      </Text>
    </div>
  );
}