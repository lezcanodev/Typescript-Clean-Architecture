import DomainError from "../../common/domain/domainError";


/**
* Post domain error
*/
export default  class PostDomainError extends DomainError{
   constructor(msg: string){
       super('Post', msg);
   }
}