import { FileId } from "../../domain/file.entity";


export interface GenerateNextFileIdOptions{
    //specify the number of ids to generate
    number: number
}

export interface FileGeneratorRepository{
    generateNextFileId(options: GenerateNextFileIdOptions): Promise<FileId[]>
}