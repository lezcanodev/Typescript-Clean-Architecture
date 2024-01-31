import { FileIdDataType } from "@file/domain/file.entity";
import { PostIdDataType } from "@post/domain/post.entity";


export interface PublicPostImage{
    id: FileIdDataType,
    publicDir: string
}

export namespace PostImageCrudParams{
    export type Save = {postId: PostIdDataType ,images: PublicPostImage[]}
}

export interface PostImageCrudRepository{
    save(postImages: PostImageCrudParams.Save): Promise<void>;
}