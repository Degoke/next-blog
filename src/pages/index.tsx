// pages/index.js or pages/index.tsx
import Appbase from '@/Layout/Appbase/Appbase';
import BlogPostList from '@/components/BlogPostList/BlogPostList';
import { countBlogPosts, fetchBlogPosts } from '@/services/firebase';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { useQuery, UseQueryOptions } from 'react-query'
import { FetchPostsParams, Post } from '@/library/types';
import { useSearchParams } from 'next/navigation';
import { Alert, Autocomplete, Input, Loader, Pagination, Title, rem } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

function useBlogPosts(params: FetchPostsParams) {
  console.log(params)
  return useQuery<Post[], any>(['posts', params.title], () => fetchBlogPosts(params))
}

function useCountQuery() {
  return useQuery<number, any>('countPosts', countBlogPosts)
}

function getStart(count, activePage, articlesPerPage) {
  if (count) {
    return ((activePage) * articlesPerPage) - count
  } else {
    return 0
  }
}

const HomePage: NextPageWithLayout = () => {
  const articlesPerPage = 8
  const [queryTitle, setQueryTitle] = useState('all')
  const params = useSearchParams()
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(1);
  const { isLoading: loadingCount, isError: isCountError, error: countError, data: count } = useCountQuery()

  const { isLoading, isError, data, error } = useBlogPosts({
    start: getStart(count, activePage, articlesPerPage),
    limit: articlesPerPage,
    title: queryTitle
  })

  useEffect(() => {
    const page = Number(params.get('page'))
    if (page <= total) {
      setActivePage(page)
    }
  }, [params])

  useEffect(() => {
    if(count) {
      setTotal(Math.ceil(count/articlesPerPage))
    }
  }, [count])

  if (loadingCount) {
    return <Loader />
  }

  if (isCountError) {
    return <Alert variant='error' title="An error Occured">
      An Error Occured: {countError}
    </Alert>
  }
  return (
    <div>
      <Title order={1}>Welcome to the Blog</Title>
      <Input
      type='search'
            placeholder="Search Blog Post"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            visibleFrom="xs"
            onChange={(e) => setQueryTitle(e.target.value)}
          />
      <BlogPostList isLoading={isLoading} isError={isError} error={error} posts={data} total={total} activePage={activePage} />
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
