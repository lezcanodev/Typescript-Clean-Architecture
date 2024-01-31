

/**
 * Represents a domain error
 */
export default class DomainError extends Error{

    /**
     * @param name of entity in which the error occured 
     * @param message cause of error 
     */
    constructor(entity: string, message: string){
        super(`${entity}: ${message}`);
    }
}