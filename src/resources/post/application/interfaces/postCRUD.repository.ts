import Post, { PostIdDataType, PostPhotos } from "@post/domain/post.entity";
import { UserIdDataType } from "@user/domain/user.entity";


export interface getAllPostsOptions{
    joinUser: boolean
}

export type PostCrudGetAllPostsOutput = {
    id: PostIdDataType,
    user: {
        id: UserIdDataType,
        nick: string
    }
    photos: PostPhotos[],
    createdAt: string,
    modifiedAt: string,
    description: string,
    numberLikes: number,
}

export interface PostCrudRepository{
    save(post: Post): Promise<void>,
    getAllPosts(options ?: getAllPostsOptions): Promise<PostCrudGetAllPostsOutput[]>
}