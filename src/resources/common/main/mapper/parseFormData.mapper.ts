import { FileRequestDataType } from "@common/infrastructure/http/interfaces";
import { FileHttpRequest } from "@common/infrastructure/http/interfaces/file";
import { Request } from "express";


export function parseFormDataFilesMapper(req: Request): FileRequestDataType{
    
    let parseFiles: FileRequestDataType = {files: []};

    if(typeof req.files === 'undefined') return parseFiles;


    if(Array.isArray(req.files)){

        parseFiles.files = req.files.map((multerFile) => {
            return multerFileToFile(multerFile)
        });
        
        return parseFiles;
    }
    
    parseFiles = {};

    Object.keys(req.files).map((key: any) => {
        if(typeof req.files !== 'undefined'){
            const multerFiles = req.files as any;

            parseFiles[key] = multerFiles[key].map((multerFile: Express.Multer.File) => {
                return multerFileToFile(multerFile)
            });
        }
    });

    
    
    return parseFiles;
}

export function multerFileToFile(multerFile: Express.Multer.File): FileHttpRequest{
    const fileExtension = multerFile.originalname.split('.');

    return {
        name: multerFile.filename,
        originalname: multerFile.originalname,
        mimetype: multerFile.mimetype,
        size: multerFile.size,
        tempDir: multerFile.path,
        fileExtension: fileExtension[fileExtension.length-1]
    }
}