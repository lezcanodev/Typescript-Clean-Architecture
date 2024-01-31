

export default class ApplicationError extends Error{
    public constructor(message: string){
        super(message);
    }
}