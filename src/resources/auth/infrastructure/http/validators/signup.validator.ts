import { Validator, ValidatorRequest } from "@common/infrastructure/http/interfaces";
import {SignUpController} from "../controllers/signup.controller";



export interface SignupValidatorParams{
    readonly validator: Validator<any, SignUpController.Request['body']>
}

export default class SignupValidator implements ValidatorRequest<SignUpController.Request>{
    
    constructor(private readonly params: SignupValidatorParams){}

    async validate(req: SignUpController.Request){
        return await this.params.validator.validate(req.body);
    }

}