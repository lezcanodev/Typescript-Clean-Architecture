import { FileStorageRepository, SaveOuput } from "src/resources/file/application/interfaces";
import File  from "src/resources/file/domain/file.entity";
import fsPromise from 'node:fs/promises';

export interface LocalStorageParams{
    publicDestination: string
}


export class LocalStorage implements FileStorageRepository{

    public constructor(private readonly params: LocalStorageParams){}

    async upload(files: File[]): Promise<SaveOuput[]> {
    
        const parseFiles: SaveOuput[] = [];
        
        await Promise.all(files.map(async (file) => {
            const publicDir = `${this.params.publicDestination}${file.name}.${file.type}`;
            await fsPromise.rename(file.tempDir, publicDir);
            parseFiles.push({
                id: file.idValue,
                publicDir:  `${process.env.BASE_URL}/${file.name}.${file.type}`
            });
        }));
        
        return parseFiles;

    }


    async removeFiles(files: File[]): Promise<void> {
        await Promise.all(files.map(async (file) => {
            await fsPromise.unlink(file.tempDir);
        }));
    }
    
}

export const localImagesStorage = new LocalStorage({
    publicDestination: `${process.env.LOCAL_STORAGE_PUBLIC_DIR}/images/`
});