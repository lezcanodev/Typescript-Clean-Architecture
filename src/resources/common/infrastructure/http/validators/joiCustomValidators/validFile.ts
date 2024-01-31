import Joi from "joi";
import { FileHttpRequest } from "../../interfaces/file";


export const validFileMessage = {
    'array.validFileExtension': '{{#fileOriginalName}} has invalid extension'
}

interface ValidFileParams{
    extensions: string[]    
}

export const validFiles: (validFile: ValidFileParams) => Joi.ExternalValidationFunction = 
(validFile: ValidFileParams) => {
    
    const {extensions} = validFile;

    return (files: FileHttpRequest[], helper) => {
       
        for(let i =0; i < files.length; i++){
            const file = files[i];
            
            if(!extensions.includes(file.fileExtension)){
                return helper.error('array.validFileExtension', {
                    fileOriginalName: file.originalname
                });
            }
            
        };

        return files;
    }
}