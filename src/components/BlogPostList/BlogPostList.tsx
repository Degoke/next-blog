// components/BlogPostList.js
import { Post } from '@/library/types';
import Link from 'next/link';
import { BlogPost } from '../BlogPost/BlogPost';
import { Alert, Center, Grid, Loader, Pagination, SimpleGrid, Skeleton, Title } from '@mantine/core';

type PageProps = {
  posts: Post[] | undefined
  isLoading: boolean
  isError: boolean
  error: any
  total: number
  activePage: number
  setActivePage: any
}

const BlogPostList = ({ posts, isError, isLoading, error, total, activePage, setActivePage }: PageProps) => {
  if (isLoading) {
    return <Center>
      <Loader />
    </Center>
  }

  if (isError) {
    return <Alert variant='error' title="An error Occured">
      An Error Occured: {error}
    </Alert>
  }

  if (!posts || posts.length === 0) {
    return <Alert variant='light' title="No Posts Here">
      No Posts Found
      <br/> 
      <Link href="/">
      Back to Posts
      </Link>
    </Alert>
  }
  return (
    <div>
      <Title order={2}>Blog Posts</Title>
      <SimpleGrid cols={{ base: 1, sm: 1, md: 2 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <BlogPost post={post} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
      <Pagination total={total} value={activePage} onChange={setActivePage} />
    </div>
  );
};

export default BlogPostList;
