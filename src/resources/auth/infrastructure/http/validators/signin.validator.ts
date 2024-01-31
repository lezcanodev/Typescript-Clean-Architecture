import { Validator, ValidatorRequest } from "@common/infrastructure/http/interfaces";
import {SigninController} from "../controllers/signin.controller";



export interface SigninValidatorParams{
    readonly validator: Validator<any, SigninController.Request['body']>
}

export default class SigninValidator implements ValidatorRequest<SigninController.Request>{
    
    constructor(private readonly params: SigninValidatorParams){}

    async validate(req: SigninController.Request){
        return await this.params.validator.validate(req.body);
    }

}