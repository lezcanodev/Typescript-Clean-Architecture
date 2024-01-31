import File, { FileIdDataType } from "../../domain/file.entity";


export interface SaveOuput{
    id: FileIdDataType,
    publicDir: string
}

export interface FileStorageRepository{
    upload(files: File[]): Promise<SaveOuput[]>,
    removeFiles(files: File[]): Promise<void>;
}