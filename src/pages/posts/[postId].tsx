import Appbase from "@/Layout/Appbase/Appbase";
import SingleBlogPost from "@/components/SingleBlogPost/SingleBlogPost";
import { useBlogPost } from "@/library/hooks";
import {
  deleteBlogPost,
  updateBlogPost,
} from "@/services/firebase";
import { Alert, Loader } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const SinglePostPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<string>('')
  const { isLoading, isError, data, error } = useBlogPost(postId);

  useEffect(() => {
    if ( params && params.postId) {
      setPostId(params.postId as string)
    }
  }, [params])

  const deletePostMutation = useMutation(deleteBlogPost, {
    onSuccess: (_, variables) => {
      console.log(variables);
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries(["post", variables]);
    },
  });

  const {
    error: editError,
    isLoading: editLoading,
    mutate: editPost,
  } = useMutation(updateBlogPost, {
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries(["post", variables.postId]);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert variant="error" title="An error Occured">
        An Error Occured: {error}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert variant="light" title="No Posts Here">
        Post not found
        <br />
        <Link href="/">Back to Posts</Link>
      </Alert>
    );
  }

  return (
    <div>
      <SingleBlogPost
        post={data}
        onDelete={deletePostMutation.mutate}
        onEdit={editPost}
        error={editError}
        isLoading={editLoading}
      />
    </div>
  );
};

SinglePostPage.getLayout = function getLayout(page: ReactElement) {
  return <Appbase>{page}</Appbase>;
};

export default SinglePostPage;
