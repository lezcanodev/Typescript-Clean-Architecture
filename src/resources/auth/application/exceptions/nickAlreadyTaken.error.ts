import ApplicationError from "@common/application/applicationError";


export class NickAlreadyTaken extends ApplicationError{
    public constructor(){
        super('The nick has already been taken');
    }
}