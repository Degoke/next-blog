import { Post, UpdatePostParams } from "@/library/types";
import {
  Group,
  Title,
  Button,
  Divider,
  Modal,
  Textarea,
  Flex,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import { Comment } from "../Comment/Comment";
import { NextSeo } from 'next-seo'

type PageProps = {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (params: UpdatePostParams, options?: any) => void;
  error: any;
  isLoading: boolean;
};

const SingleBlogPost = ({ post, onDelete, onEdit, isLoading }: PageProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [comment, setComment] = useState("");

  const addComment = () => {
    let comments;
    if (post.comments) {
      comments = [...post.comments, comment];
    } else {
      comments = [comment];
    }
    onEdit({
      postId: post.id,
      post: { comments },
    });
  };
  return (
    <>
    <NextSeo
      title={post.title}
      description={post.title}
    />
      <Center mb={16}>
        <Title order={1}>{post.title}</Title>
      </Center>
      <Divider size="xl" mb={16} />
      <pre dangerouslySetInnerHTML={{ __html: post.content }}></pre>
      <Divider size="xl" mb={16} />
      <div>
        <p>By: Anonymous User</p>
        <p>Date: {new Date(post.createdTimestamp).toLocaleDateString()}</p>
        <p>
          LastEdited: {new Date(post.updatedTimestamp).toLocaleDateString()}
        </p>
      </div>
      <Flex gap="md" align="center" direction="row" wrap="wrap" mb={16}>
        <Link href={`/posts/edit/${post.id}`} passHref>
          <Button variant="outline">Edit Post</Button>
        </Link>

        <Button variant="outline" color="red" onClick={open}>Delete Post</Button>
      </Flex>

      <Title order={3} mb={16}>
        Add Comment
      </Title>
      <Textarea mb={16} onChange={(e) => setComment(e.target.value)} />
      <Button variant="light" mb={16} onClick={addComment} loading={isLoading}>
        Comment
      </Button>

      <Title mb={16} order={3}>
        Comments
      </Title>
      {post.comments?.map((comment) => (
        <Comment key={comment} comment={comment} />
      ))}
      <Modal opened={opened} onClose={close} size="auto" title="Delete Post">
        <p>Are you sure you want to delete the post {post.title}</p>

        <Group mt="xl">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button variant="outline" color="red" onClick={() => onDelete(post.id)}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default SingleBlogPost;
