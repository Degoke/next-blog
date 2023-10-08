// components/CreateBlogPostForm.js
import { useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { Transaction } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';
import { Post, UpdatePostParams } from '@/library/types';
import { Alert, Button, LoadingOverlay, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

type PageProps = {
    onEdit: (params: UpdatePostParams, options: any) => void,
    post: Post
    error: any
    isLoading: boolean
}

const EditPostForm = ({ onEdit, post, error, isLoading }: PageProps) => {
  const [title, setTitle] = useState(post.title);
  const content = post.content;
  const [editor, setEditor] = useState<{editor: Editor, trasaction: Transaction}>()

  const [opened, { open, close }] = useDisclosure(false);

  const handleCreate = () => {
    const editedPost = {
      title,
      content: editor?.editor.getHTML() || "",
      updatedTimestamp: new Date().toUTCString(),
    };
    onEdit({
        postId: post.id,
        post: editedPost
    }, {
        onSuccess: () => {
            open()
        }
    });
    setTitle('');
  };

  return (
    <div>
        {error && (
            <Alert variant='error' title="An error Occured" >
            An Error Occured: {error}
          </Alert>
        )}
      <Title order={1}>Edit Blog Post</Title>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <TextEditor content={content} onUpdate={setEditor} />
      <Button onClick={handleCreate} disabled={!editor || !title}>Save</Button>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Post updated Successfully
        <br />
        <Link href={`/posts/${post.id}`}>
        View Post
        </Link>
      </Modal>
    </div>
  );
};

export default EditPostForm;
