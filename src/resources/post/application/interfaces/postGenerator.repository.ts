import { PostId } from "@post/domain/post.entity";


export interface PostGenerator{
    generateNextPostId(): Promise<PostId>
}