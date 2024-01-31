import { ErrorValidator } from "./validator";
import { HttpRequest } from "./HTTPRequest";



/**
 * Define the methods for validating a http request
 */
export interface ValidatorRequest<TSchemaInput extends HttpRequest>{
    validate(input: TSchemaInput): Promise<ErrorValidator>
}