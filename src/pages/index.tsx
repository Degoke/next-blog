import BlogPostList from "@/components/BlogPostList/BlogPostList";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { Post } from "@/library/types";
import { Input, Title, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import Appbase from "../Layout/Appbase/Appbase";
import { NextSeo } from "next-seo";
import { useBlogPosts } from "@/library/hooks";
import { chunk } from "@/library/utils";

const HomePage: NextPageWithLayout = () => {
  const articlesPerPage = 8;
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);

  const { isLoading, isError, data, error } = useBlogPosts();

  const handleSearch = (title: string) => {
    setPosts(data?.filter((data) => data.title.includes(title)) || []);
  };

  useEffect(() => {
    if (data) {
      const chunks = chunk(data, articlesPerPage);
      setPosts(chunks[activePage - 1]);
      setTotal(chunks.length);
    }
  }, [data, activePage]);

  return (
    <div>
      <NextSeo title="next js Blog" description="A simple next js blog" />
      <Title order={1} mb={16}>
        Welcome to the Blog
      </Title>
      <Input
        type="search"
        placeholder="Search Blog Post"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        visibleFrom="xs"
        onChange={(e) => handleSearch(e.target.value)}
        mb={16}
      />
      <BlogPostList
        isLoading={isLoading}
        isError={isError}
        error={error}
        posts={posts}
        total={total}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
};
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Appbase>{page}</Appbase>;
};

export default HomePage;
