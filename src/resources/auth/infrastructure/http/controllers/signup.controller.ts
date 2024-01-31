import { OutputSignUpDTO, SignUpDTO, SignUpInputBoundary } from "@auth/application/signup";
import BaseController from "@common/infrastructure/http/controllers/base.controller";
import { created } from "@common/infrastructure/http/helper";
import { HttpRequest, HTTPResponse } from "@common/infrastructure/http/interfaces";
import { ValidatorRequest } from "@common/infrastructure/http/interfaces";


export namespace SignUpController{
    export type Request =  HttpRequest<SignUpDTO>
    export type Response = HTTPResponse<OutputSignUpDTO>
}


export interface SignUpControllerParams{
    // use case to register an user
    readonly signupUseCase: SignUpInputBoundary,
    // validate the request data signup
    readonly signupValidator: ValidatorRequest<SignUpController.Request>
}

/**
 * Responsible for adapting the external data for use in Singup Uses case
 */
export default class SignUpController extends BaseController{
    
    public constructor(private readonly params: SignUpControllerParams){
        super({
            validatorRequest: params.signupValidator
        });
    }

    protected async execute(httpRequest: SignUpController.Request): Promise<SignUpController.Response> {
        const user = await this.params.signupUseCase.run({
            nick: httpRequest.body!.nick,
            email: httpRequest.body!.email,
            password: httpRequest.body!.password
        });

        const response = created();
        const {id, ...rest} = user;
        
        response.body = {
            id: id,
            ...rest
        };

        return response;
    }
}