import { TokenDataType, SessionManagerRepository, SessionData } from "@auth/application/interfaces";
import { forbidden, ok } from "@common/infrastructure/http/helper";
import { HttpRequest, HTTPResponse } from "@common/infrastructure/http/interfaces";
import BaseMiddleware from "@common/infrastructure/http/middlewares/base.middleware";
import { SessionDataResponse } from "../interfaces";


namespace AuthMiddleware{
    export type Request =  HttpRequest<any, any, any, {authorization: string}>
    export type Response = HTTPResponse<SessionDataResponse>
}


export interface AuthMiddlewareParams{
    readonly sessionManager: SessionManagerRepository
}

export default class AuthMiddleware extends BaseMiddleware{
    
    public constructor(private readonly params: AuthMiddlewareParams){
        super();
    }

    protected async execute(httpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
        const authorizationHeader = httpRequest.headers?.authorization;

        if(!authorizationHeader) return forbidden();
                 
        const [,token] =  authorizationHeader.split('Bearer ');

        if(!token) return forbidden();

        const sessionData = await this.params.sessionManager.verifyToken(token);
        
        if(sessionData == null) return forbidden();

        const response = ok();
        
        response.body = {
            sessionData: sessionData
        }

        return response
    }

}