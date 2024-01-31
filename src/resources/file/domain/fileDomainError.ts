import DomainError from "../../common/domain/domainError";


/**
* Post domain error
*/
export default  class FileDomainError extends DomainError{
   constructor(msg: string){
       super('File', msg);
   }
}