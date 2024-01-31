import {  internalServerError } from "../helper";
import { HttpRequest, HTTPResponse } from "../interfaces";



type HttpRequestDefault = HttpRequest<any, any, any, any>;
type HTTPResponseDefault = HTTPResponse<any>;


export default abstract class BaseMiddleware{

    protected abstract execute(httpRequest: HttpRequestDefault): Promise<HTTPResponseDefault>;

    public async handle(httpRequest: HttpRequestDefault):  Promise<HTTPResponseDefault>{
        try{
            return await this.execute(httpRequest);
        }catch(error){
            return internalServerError();
        }
    }

}