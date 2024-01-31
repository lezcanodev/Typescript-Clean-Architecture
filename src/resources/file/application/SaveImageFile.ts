import { UseCase } from "@common/application/usescases";
import File, { FileIdDataType, FileProps } from "../domain/file.entity";
import {  FileStorageRepository } from "./interfaces";
import { FileGeneratorRepository } from "./interfaces/fileGenerator.repository";

export interface SaveImageFileDTO extends Omit<FileProps, 'id'>{};

export interface OutputSaveImageFile{
    images: {
        id: FileIdDataType,
        publicDir: string
    }[]
}

export interface SaveFileProps{
    readonly fileStorage: FileStorageRepository,
    readonly fileGenerator: FileGeneratorRepository
}

export default class SaveImageFile implements UseCase<SaveImageFileDTO[], OutputSaveImageFile>{

    public constructor(private readonly params: SaveFileProps){}

    /**
     * Responsible for uploading the image files
     */
    async run(input: SaveImageFileDTO[]): Promise<OutputSaveImageFile> {

        if(input.length === 0) return {images:[]};

        const fileIds = await this.params.fileGenerator.generateNextFileId({
            number: input.length
        });

        const files: File[] = input.map( (file, index) => File.buildImage({
            id: fileIds[index],
            ...file
        }) );

        const result = await this.params.fileStorage.upload(files);
       
        return {
            images: result.map((uploadedFile) => {
                return {
                   id: uploadedFile.id,
                   publicDir: uploadedFile.publicDir
                }
            })
        };
    }
}