import { GetAllPostsOptions, PostCrudGetAllPostsOutput } from "@post/application/interfaces/postCRUD.repository";
import Post from "@post/domain/post.entity";


export const fakePostCRUD = {
    save: jest.fn<Promise<void>, [Post]>(),
    getAllPosts: jest.fn<Promise<PostCrudGetAllPostsOutput[]>, [GetAllPostsOptions]>()
}