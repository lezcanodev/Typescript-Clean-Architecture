import Joi from "joi";
import { Repository } from "typeorm";


export const isUniqueErrorMessage = {
    'string.unique': '{{#label}} had already been taken'
}

interface IsUniqueParams{
    repository: Repository<any>,
    columnName: string
}

export const isUnique: (isUniqueParams: IsUniqueParams) => Joi.ExternalValidationFunction = 
(isUniqueParams: IsUniqueParams) => {
    
    const {repository, columnName} = isUniqueParams;

    return async (value, helper) => {
       
        const exist = await repository.exist({
            where: {
                [columnName]: value
            }
        });

        if(exist){
            return helper.error('string.unique');
        }

        return value;
    }
}