// pages/index.js or pages/index.tsx
import BlogPostList from '@/components/BlogPostList/BlogPostList';
import { countBlogPosts, fetchBlogPosts } from '@/services/firebase';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { useQuery, UseQueryOptions } from 'react-query'
import { Post } from '@/library/types';
import { useSearchParams } from 'next/navigation';
import { Alert, Autocomplete, Input, Loader, Pagination, Title, rem } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import Appbase from '../Layout/Appbase/Appbase';

function chunk(array, chunkSize) {
  if (chunkSize < 1) {
    return []
  }
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk)
}

return chunks
}

function useBlogPosts() {
  return useQuery<Post[], any>(['posts'], fetchBlogPosts)
}

// function useCountQuery() {
//   return useQuery<number, any>('countPosts', countBlogPosts)
// }

const HomePage: NextPageWithLayout = () => {
  const articlesPerPage = 8
  const [queryTitle, setQueryTitle] = useState('all')
  const params = useSearchParams()
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(1);
  const [posts, setPosts] = useState<Post[]>([])

  const { isLoading, isError, data, error } = useBlogPosts()

  const handleSearch = (title: string) => {
     setPosts(data?.filter((data) => data.title.includes(title)) || [])
  }

  useEffect(() => {
    if (data) {
      const chunks = chunk(data, articlesPerPage)
      setPosts(chunks[activePage - 1])
      setTotal(chunks.length)
    }
    
  }, [data, activePage])

  
  return (
    <div>
      <Title order={1}>Welcome to the Blog</Title>
      <Input
      type='search'
            placeholder="Search Blog Post"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            visibleFrom="xs"
            onChange={(e) => handleSearch(e.target.value)}
          />
      <BlogPostList isLoading={isLoading} isError={isError} error={error} posts={posts} total={total} activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};
HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Appbase>
      {page}
      </Appbase>
  )
}

export default HomePage;
