import { Post, UpdatePostParams } from "@/library/types";
import { Group, ActionIcon, Title, Button, Divider, Modal, Textarea, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { generateHTML } from "@tiptap/react";
import { increment } from "firebase/firestore";
import Link from "next/link";
import { ReactNode, createElement, useEffect, useMemo, useRef, useState } from "react";
import { json } from "stream/consumers";
import { Comment } from "../Comment/Comment";

type PageProps = {
    post: Post
    onDelete: (id: string) => void
    onEdit: (params: UpdatePostParams, options?: any) => void,
    error: any
    isLoading: boolean
}

function elementFromString(value: string) {
    const htmlDoc = document.createElement('pre')
    htmlDoc.innerHTML = value.trim()
    const element = createElement('div')
    element.props.dangerouslySetInnerHTML = {
        __html: htmlDoc
    }
    return element
  }

const SingleBlogPost = ({ post, onDelete, onEdit, isLoading }: PageProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [comment, setComment] = useState('')

  const addComment = () => {
    let comments;
    if(post.comments) {
      comments = [...post.comments, comment]
    } else {
      comments = [comment]
    }
    onEdit({
      postId: post.id,
      post: { comments }
    })
  }
    return (
        <>
        <Flex gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap">
      <div>
      <Title order={1}>{post.title}</Title>
        <p>By: Anonyous User</p>
        <p>Date: {new Date(post.createdTimestamp).toLocaleDateString()}</p>
        <p>LastEdited: {new Date(post.updatedTimestamp).toLocaleDateString()}</p>

      </div>
      <Link href={`/posts/edit/${post.id}`} passHref>
      <Button>Edit Post</Button>
      </Link>
      
      <Button onClick={open}>Delete Post</Button>
        </Flex>
        
        <Divider size="xl" />
        
        <pre dangerouslySetInnerHTML={{__html: post.content}}></pre>
      <Divider size="xl" />
      
      <Title order={3}>
        Add Comment
      </Title>
      <Textarea onChange={(e) => setComment(e.target.value)} />
      <Button onClick={addComment} loading={isLoading}>Comment</Button>

      <Title order={3}>
        Comments
      </Title>
      {post.comments?.map((comment) => <Comment key={comment} comment={comment} />)}
      <Modal opened={opened} onClose={close} size="auto" title="Delete Post">
        <p>Are you sure you want to delete the post {post.title}</p>

        <Group mt="xl">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onDelete(post.id)}>
            Delete
          </Button>
        </Group>
      </Modal>
      </>
    );
  };
  
  export default SingleBlogPost;
  