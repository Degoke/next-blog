import { Post } from "@/library/types";
import Link from "next/link";
import { BlogPost } from "../BlogPost/BlogPost";
import {
  Alert,
  Center,
  Loader,
  Pagination,
  SimpleGrid,
  Title,
} from "@mantine/core";

type PageProps = {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  total: number;
  activePage: number;
  setActivePage: any;
};

const LoadingState = () => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};

const ErrorState = ({ error }: { error: any }) => {
  return (
    <Alert variant="error" title="An error Occured">
      An Error Occured: {error}
    </Alert>
  );
};

const EmptyState = () => {
  return (
    <Alert variant="light" title="No Posts Here">
      No Posts Found
      <br />
      <Link href="/posts/new">Create a Post</Link>
    </Alert>
  );
};

const BlogPostList = ({
  posts,
  isError,
  isLoading,
  error,
  total,
  activePage,
  setActivePage,
}: PageProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  if (!posts?.length) {
    return <EmptyState />;
  }
  return (
    <>
      <Title order={2} mb={16}>
        Blog Posts
      </Title>
      <SimpleGrid
        mb={16}
        cols={{ base: 1, sm: 1, md: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <BlogPost post={post} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
      <Pagination mb={16} total={total} value={activePage} onChange={setActivePage} />
    </>
  );
};

export default BlogPostList;
