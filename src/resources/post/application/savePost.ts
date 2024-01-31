import { UseCase } from "@common/application/usescases";
import Post, {  PostIdDataType, PostProps } from "@post/domain/post.entity";
import { PostCrudRepository } from "./interfaces/postCRUD.repository";
import { PostGenerator } from "./interfaces/postGenerator.repository";
import {  Timestamp } from "@common/domain/types";
import SaveImageFile, { SaveImageFileDTO } from "@file/application/SaveImageFile";
import { PostImageCrudRepository } from "./interfaces/postImageCRUD.repository";


/**
 * Input model to save a new Post
 */
export interface PostSaveDTO extends Omit<PostProps, 'numberLikes' | 'photos' | 'id' | 'timestamp'>{
    postImages: SaveImageFileDTO[]
};

/**
 * Ouput model to save a new Post
 */
export type OutputPostSave = {
    id: PostIdDataType
};

export interface PostSaveParams{
    readonly postCrud: PostCrudRepository,
    readonly postImageCrud: PostImageCrudRepository,
    readonly saveImageFileUseCase: SaveImageFile,
    readonly postGenerator: PostGenerator,
}

/**
 * Uses cases responsible for creating a new post
 */
export default class SavePost implements  UseCase<PostSaveDTO, OutputPostSave>{
    public constructor(private readonly params: PostSaveParams){}
    /**
     * Responsible for creating a new post
     * @param input input model to save a new post
     */
    async run(input: PostSaveDTO): Promise<OutputPostSave> {

        const {description, userId, postImages} = input;
        
        const {images} = await this.params.saveImageFileUseCase.run(postImages);
        const postId = await this.params.postGenerator.generateNextPostId();
        const timestamp = new Timestamp();

        const post = Post.build({
            id: postId,
            userId: userId,
            description: description,
            photos: images,
            numberLikes: 0,
            timestamp: timestamp
        });

        await this.params.postCrud.save(post);

        await this.params.postImageCrud.save({
            postId: post.idValue,
            images:images
        });

        return {
            id: post.idValue
        }
    }
}