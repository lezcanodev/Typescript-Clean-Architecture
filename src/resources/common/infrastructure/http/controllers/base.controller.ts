import { UseCase } from "@common/application/usescases";
import { badRequest, internalServerError } from "../helper";
import { HttpRequest, HTTPResponse } from "../interfaces";
import { ValidatorRequest } from "../interfaces";


// Default request and response
type HttpRequestDefault = HttpRequest<any, any, any, any>;
type HTTPResponseDefault = HTTPResponse<any>;

/**
 * Properties of the BaseController constructor 
 */
interface BaseControllerParams{
        // Responsible for validating the request data
    readonly validatorRequest: ValidatorRequest<any>
}


export default abstract class BaseController{

    /**
     * Constructor of BaseController abstract class
     * @param baseParams 
     */
    constructor(private readonly baseParams?: BaseControllerParams){}

    /**
     * Responsible for adapting the incomming http request data to the use case
     * @param httpRequest incoming http request
     */
    protected abstract execute(httpRequest: HttpRequestDefault): Promise<HTTPResponseDefault>;

    
    public async handle(httpRequest: HttpRequestDefault):  Promise<HTTPResponseDefault>{
        try{
            const errors = await this.baseParams?.validatorRequest.validate(httpRequest);
            
            if(typeof errors !== 'undefined' && errors.errors.length > 0){
                const responseError = badRequest();
                responseError.body = errors;
                return responseError;
            }

            return await this.execute(httpRequest);
        }catch(error: unknown){
            const response = internalServerError();
            return response;
        }
    }

}