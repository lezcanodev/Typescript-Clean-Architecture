import { FileHttpRequest } from "@common/infrastructure/http/interfaces/file";
import { Request } from "express";
import fsPromises from "fs/promises";
import multer from "multer";


const parseFormData = multer({
    dest: process.env.LOCAL_STORAGE_TEMP_DIR
});

export interface uploadFilesOptions{
    nameFields: {nameField: string}[]
}

export function uploadFiles(options: uploadFilesOptions){
    
    const multerOption = options.nameFields.map((nameField) => {
        return { name: nameField.nameField }
    })

    return parseFormData.fields(multerOption);

}

export async function removeTempFiles(files: FileHttpRequest[]){
    for(let i=0; i<files.length; i++){
        const file = files[i];
        await fsPromises.unlink(file.tempDir);
    }
}