// components/BlogPostList.js
import { Post } from '@/library/types';
import Link from 'next/link';
import { BlogPost } from '../BlogPost/BlogPost';
import { Alert, Grid, Pagination, SimpleGrid, Skeleton, Title } from '@mantine/core';

type PageProps = {
  posts: Post[] | undefined
  isLoading: boolean
  isError: boolean
  error: any
  total: number
  activePage: number
}

const BlogPostList = ({ posts, isError, isLoading, error, total, activePage }: PageProps) => {
  if (isLoading) {
    return <Skeleton />
  }

  if (isError) {
    return <Alert variant='error' title="An error Occured">
      An Error Occured: {error}
    </Alert>
  }

  if (!posts) {
    return <Alert variant='light' title="No Posts Here">
      There are no post yet
    </Alert>
  }
  return (
    <div>
      <Title order={2}>Blog Posts</Title>
      <SimpleGrid cols={2}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <BlogPost post={post} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
      <Pagination total={total} value={activePage} />
    </div>
  );
};

export default BlogPostList;
