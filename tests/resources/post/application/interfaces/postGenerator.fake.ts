import { PostId } from "@post/domain/post.entity";


export const fakePostGenerator = {
    generateNextPostId: jest.fn<Promise<PostId>, [void]>()
}