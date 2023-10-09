export type Post = {
    id: string
    title: string
    content: string
    createdTimestamp: string
    updatedTimestamp: string
    comments: string[]
}

export type UncreatedPost = Omit<Post, 'id'>

export type UpdatePostParams = {
    postId: string
    post: Partial<Post>
}
