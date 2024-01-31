import DomainError from "@common/domain/domainError";

/**
 * User domain error
 */
export default class UserDomainError extends DomainError{
    public constructor(msg: string){
        super('User', msg);
    }
}