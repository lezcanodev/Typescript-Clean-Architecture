import Joi from "joi";
import { ErrorField, ErrorValidator, Validator } from "../interfaces";
import { customErrorMessages } from "./joiCustomValidators";


export default class JoiValidator<TSchemaInput> extends Validator<Joi.ObjectSchema<TSchemaInput>, TSchemaInput>{

    async validate(input: TSchemaInput): Promise<ErrorValidator> {
        try{

            await this.schema.validateAsync(input, {
                abortEarly: false,
                messages: customErrorMessages,
                allowUnknown: true
            });

            return {errors:[]}

        }catch(errors){
            
            if(errors instanceof Joi.ValidationError){
                const parseErrors: ErrorField[] = errors.details.map((err) => {
                    const label = err.context!.label;
                    return {[label!]: err.message};
                })

                return {
                    errors: parseErrors
                }
            }

            throw errors;
        }
       
    }
    
}