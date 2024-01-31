import ApplicationError from "@common/application/applicationError";


export class IncorrectCredentials extends ApplicationError{
    public constructor(){
        super('Incorrect Credentials');
    }
}