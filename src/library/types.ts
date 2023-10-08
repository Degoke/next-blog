export type Post = {
    id: string
    title: string
    content: string
    createdTimestamp: string
    updatedTimestamp: string
}

export type UncreatedPost = Omit<Post, 'id'>

export type UpdatePostParams = {
    postId: string
    post: Omit<Post, "createdTimestamp" | "id">
}

export type FetchPostsParams = {
    limit: number
    start: number
    title: string
}