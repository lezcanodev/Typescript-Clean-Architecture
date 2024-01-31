import { Validator, ValidatorRequest } from "@common/infrastructure/http/interfaces";
import {PostSaveController} from "../controllers/postSave.controller";
import { removeTempFiles } from "@common/main/factory";


export interface PostSaveValidatorParams{
    readonly validator: Validator<any, any>,
}

export default class PostSaveValidator implements ValidatorRequest<PostSaveController.Request>{
    
    constructor(private readonly params: PostSaveValidatorParams){}

    async validate(req: PostSaveController.Request){

        const errors = await this.params.validator.validate(req)

        if(typeof req.files !== 'undefined' && errors.errors.length > 0){
            for(let fileFieldName in req.files){
                removeTempFiles(req.files[fileFieldName]);
            }
        }

        return errors;
    }

}