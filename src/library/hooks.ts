import { fetchBlogPost, fetchBlogPosts } from "@/services/firebase";
import { useQuery } from "react-query";
import { Post } from "./types";

export function useBlogPost(id: string) {
    return useQuery<Post | null, any>(["post", id], () => fetchBlogPost(id), {
      enabled: !!id,
    });
  }

  export function useBlogPosts() {
    return useQuery<Post[], any>(["posts"], fetchBlogPosts);
  }