

/**
 * Represents a dommain type error
 */
export default class DomainTypeError extends Error{
    
    /**
     * @param msg cause of error
     */
    public constructor(msg: string){
        super(msg)
    }
}