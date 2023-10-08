// components/CreateBlogPostForm.js
import { useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { Transaction } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';
import { Alert, Button, LoadingOverlay, Modal, Title } from '@mantine/core';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Post, UncreatedPost } from '@/library/types';

type PageProps = {
    onCreate: (post: UncreatedPost, options: any) => void
    error: any
    isLoading: boolean
    data: { id: string } | undefined
    }

const CreateBlogPostForm = ({ onCreate, error, isLoading, data }: PageProps) => {
  const [title, setTitle] = useState('');
  const content = '<h2 style="text-align: center;">Start typing to create your post</h2>';
  const [editor, setEditor] = useState<{editor: Editor, trasaction: Transaction}>()
  const [opened, { open, close }] = useDisclosure(false);


  const handleCreate = () => {
    const newContent = editor?.editor.getHTML();
    const newPost = {
      title,
      content: newContent as string,
      createdTimestamp: new Date().toISOString(),
      updatedTimestamp: new Date().toISOString(),
    };
    onCreate(newPost, {
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
      <Title order={1}>Create a New Blog Post</Title>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextEditor content={content} onUpdate={setEditor} />
      <Button onClick={handleCreate} disabled={!editor || !title}>Create</Button>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Post created Successfully
        <br />
        <Link href={`/posts/${data?.id}`}>
        View Post
        </Link>
      </Modal>
    </div>
  );
};

export default CreateBlogPostForm;
