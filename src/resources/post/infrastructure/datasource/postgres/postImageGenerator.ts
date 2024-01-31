import { PostImageEntityPostgres } from "@common/infrastructure/datasource/postgres/entities/postImage.entity";
import { FileGeneratorRepository, GenerateNextFileIdOptions } from "@file/application/interfaces/fileGenerator.repository";
import { FileId } from "@file/domain/file.entity";
import { Repository } from "typeorm";
import { postImageRepository } from "./postImageRepository";


export class PostImageGeneratorPostgres implements FileGeneratorRepository{
    
    public constructor(private readonly repository: Repository<PostImageEntityPostgres >){}

    async generateNextFileId(options: GenerateNextFileIdOptions): Promise<FileId[]> {
        const fileIds: FileId[] = [];
        let numberIds = options.number;
        
        for(let i=0; i < numberIds; i++){
            const rawData = await this.repository.query(`SELECT nextval('post_images_id_seq') as id`);
            fileIds[i] = new FileId(rawData[0]['id']);
        }
        
        return fileIds;
    }
}

export const postImageGeneratorPosgres = new PostImageGeneratorPostgres(postImageRepository);