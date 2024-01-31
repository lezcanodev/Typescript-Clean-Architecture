import { PostImageEntityPostgres } from "@common/infrastructure/datasource/postgres/entities/postImage.entity";
import { PostImageCrudRepository, PostImageCrudParams } from "@post/application/interfaces/postImageCRUD.repository";
import { DeepPartial, Repository } from "typeorm";
import { postImageRepository } from "./postImageRepository";


export class PostImageCrudPostgres implements PostImageCrudRepository{
    
    public constructor(private readonly repository: Repository<PostImageEntityPostgres>){}
    
    async save(postImages: PostImageCrudParams.Save): Promise<void> {
       
        const parsePostImages: any = postImages.images.map((postImage) => {
            return {
                id: postImage.id,
                postId: postImages.postId,
                url: postImage.publicDir,
            }
        });

        await this.repository.save(parsePostImages);

    }
}

export const postImageCrudPostgres = new PostImageCrudPostgres(postImageRepository);