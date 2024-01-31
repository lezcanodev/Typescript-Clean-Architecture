import { PostGenerator } from "@post/application/interfaces/postGenerator.repository";
import { PostId } from "@post/domain/post.entity";
import {v4 as uuidV4} from 'uuid';

export class PostGeneratorPosgres implements PostGenerator{

    async generateNextPostId(): Promise<PostId> {
        return new PostId(uuidV4());
    }

}

export const postGeneratorPosgres = new PostGeneratorPosgres();
