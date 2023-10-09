import { Card, Avatar, Text, Group } from "@mantine/core";
import classes from "./BlogPost.module.css";
import { Post } from "@/library/types";
import { IconStar } from "@tabler/icons-react";

type Pageprops = {
  post: Post;
};

export function BlogPost({ post }: Pageprops) {
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <div className={classes.body}>
          <Avatar color="blue" radius="sm">
            <IconStar size="1.5rem" />
          </Avatar>
          <Text className={classes.title} mt="xs" mb="md">
            {post.title}
          </Text>

          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar radius="xl" />
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
