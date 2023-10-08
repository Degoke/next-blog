import { Post } from "@/library/types";
import { Group, ActionIcon, Title, Button, Divider } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { generateHTML } from "@tiptap/react";
import Link from "next/link";
import { ReactNode, createElement, useEffect, useMemo, useRef } from "react";
import { json } from "stream/consumers";

type PageProps = {
    post: Post
    onDelete: (id: string) => void
}

function elementFromString(value: string) {
    const htmlDoc = document.createElement('pre')
    htmlDoc.innerHTML = value.trim()
    const element = createElement('div')
    element.props.dangerouslySetInnerHTML = {
        __html: htmlDoc
    }
    return element
  }

const SingleBlogPost = ({ post, onDelete }: PageProps) => {

    console.log(post)
    // const [content, setContent] = 
    // useEffect(() => {

    // }, [post])
    return (
        <>
        <Title order={1}>{post.title}</Title>
        <p>By: Anonyous User</p>
        <p>Date: {new Date(post.createdTimestamp).toLocaleDateString()}</p>
        <Divider size="xl" />
        
        <pre dangerouslySetInnerHTML={{__html: post.content}}></pre>
      <Divider size="xl" />
      <Link href={`/posts/edit/${post.id}`} passHref>
      <Button>Edit Post</Button>
      </Link>
      
      <Button onClick={() => onDelete(post.id)}>Delete Post</Button>
      <p>LastEdited: {new Date(post.updatedTimestamp).toLocaleDateString()}</p>
      </>
    );
  };
  
  export default SingleBlogPost;
  