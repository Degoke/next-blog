import { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { Transaction } from "@tiptap/pm/state";
import { Editor } from "@tiptap/react";
import { Post, UpdatePostParams } from "@/library/types";
import {
  Alert,
  Button,
  LoadingOverlay,
  Modal,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

type PageProps = {
  onEdit: (params: UpdatePostParams, options: any) => void;
  post: Post;
  error: any;
  isLoading: boolean;
};

const EditPostForm = ({ onEdit, post, error, isLoading }: PageProps) => {
  const [title, setTitle] = useState(post.title);
  const content = post.content;
  const [editor, setEditor] = useState<{
    editor: Editor;
    trasaction: Transaction;
  }>();

  const [opened, { open, close }] = useDisclosure(false);

  const handleCreate = () => {
    const editedPost = {
      title,
      content: editor ? editor.editor.getHTML() : post.content,
      updatedTimestamp: new Date().toUTCString(),
    };
    onEdit(
      {
        postId: post.id,
        post: editedPost,
      },
      {
        onSuccess: () => {
          open();
        },
      }
    );
    setTitle("");
  };

  return (
    <div>
      {error && (
        <Alert variant="error" title="An error Occured">
          An Error Occured: {error}
        </Alert>
      )}
      <Title order={1} mb={16}>
        Edit Blog Post
      </Title>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        h="100%"
      />
      <Textarea
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        mb={16}
      />

      <TextEditor content={content} onUpdate={setEditor} />
      <Button mt={16} onClick={handleCreate} loading={isLoading}>
        Save
      </Button>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Post updated Successfully
        <br />
        <Link href={`/posts/${post.id}`}>View Post</Link>
      </Modal>
    </div>
  );
};

export default EditPostForm;
