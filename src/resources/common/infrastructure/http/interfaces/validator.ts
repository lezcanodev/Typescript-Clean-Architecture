

export interface ErrorField{
    //[name of field]: description of the error
    [field: string]: any
}

export interface ErrorValidator{
    errors: ErrorField[]
}

/**
 * Base class that each validator implementation must extend.
 * validator is responsible for validating the data.
 * 
 * TSchemaValidator define the schema used by the validator implementatrion
 * TSchemaInput define the expected data structure (e.g., 'name' must be string)
 */
export abstract class Validator<TSchemaValidator, TSchemaInput>{
    
    constructor(protected readonly schema: TSchemaValidator){}

    public abstract validate(input: TSchemaInput): Promise<ErrorValidator>;

} 