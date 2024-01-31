import { SigninDTO, SigninInputBoundary } from "@auth/application/signin";
import { OutputSignUpDTO } from "@auth/application/signup";
import BaseController from "@common/infrastructure/http/controllers/base.controller";
import { HttpRequest, HTTPResponse, ValidatorRequest } from "@common/infrastructure/http/interfaces";
import { badRequest, ok } from "@common/infrastructure/http/helper";
import ApplicationError from "@common/application/applicationError";


export namespace SigninController{
    export type Request = HttpRequest<SigninDTO>
    export type Response = HTTPResponse<OutputSignUpDTO>
}


interface SigninControllerParams{
    readonly signinUseCase: SigninInputBoundary,
    readonly signinValidator: ValidatorRequest<SigninController.Request>
}

export default class SigninController extends BaseController{

    public constructor(private readonly params:SigninControllerParams){
        super({
            validatorRequest: params.signinValidator
        });
    }

    protected async execute(httpRequest: SigninController.Request): Promise<SigninController.Response> {
        try {
            const authToken = await this.params.signinUseCase.run({
                nickOrEmail: httpRequest.body!.nickOrEmail,
                password: httpRequest.body!.password
            });
            
            const response = ok();
            response.body = {
                token: authToken
            };
            
            return response;

        } catch (error:unknown) {
            
            if(error instanceof ApplicationError){
                const response = badRequest();
                response.body = {
                    "error": error.message
                }
                return response;
            }

            throw error;
        }
    }

}