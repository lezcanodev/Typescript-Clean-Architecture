import ApplicationError from "@common/application/applicationError";


export class EmailAlreadyTaken extends ApplicationError{
    public constructor(){
        super('The email has already been taken');
    }
}