// pages/[postId].js or pages/[postId].tsx
import Appbase from '@/Layout/Appbase/Appbase';
import SingleBlogPost from '@/components/SingleBlogPost/SingleBlogPost';
import { Post } from '@/library/types';
import { deleteBlogPost, fetchBlogPost, fetchBlogPosts } from '@/services/firebase';
import { Alert, Loader } from '@mantine/core';
import { useParams } from 'next/navigation';
import { ReactElement } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'

function useBlogPost(id: string) {
  return useQuery<Post | null, any>(['post', id], () => fetchBlogPost(id), {
    enabled: !!id,
  })
}

const SinglePostPage = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useBlogPost(postId as string)

  const deletePostMutation = useMutation(deleteBlogPost, {
    onSuccess: (_, variables) => {
      console.log(variables)
      // Invalidate and refetch
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries(['post', variables])
    },
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Alert variant='error' title="An error Occured">
    An Error Occured: {error}
  </Alert>
  }

  if (!data) {
    return <Alert variant='light' title="No Posts Here">
    Post not found
  </Alert>
  }

  return (
    <div>
      <SingleBlogPost post={data} onDelete={deletePostMutation.mutate} />
    </div>
  );
};

SinglePostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Appbase>
      {page}
      </Appbase>
  )
}

export default SinglePostPage;
