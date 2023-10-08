import { Card, Image, Avatar, Text, Group } from '@mantine/core';
import classes from './BlogPost.module.css';
import { Post } from '@/library/types';

type Pageprops = {
    post: Post
}

export function BlogPost({ post }: Pageprops) {
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image
          src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
          height={160}
          alt=""
        />
        <div className={classes.body}>
          <Text className={classes.title} mt="xs" mb="md">
            {post.title}
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={20}
                src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
              />
              <Text size="xs">Anonymous User</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(post.createdTimestamp).toLocaleDateString()}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}