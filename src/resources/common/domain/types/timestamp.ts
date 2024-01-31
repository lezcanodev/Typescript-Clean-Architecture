


export interface TimestampProps{
    createdAt: Date,
    modifiedAt: Date
}


export class Timestamp{
    private readonly _timestampProps : TimestampProps;

    public constructor (timestampProps?: TimestampProps){
        
        if(typeof timestampProps === 'undefined'){
            const date = new Date();

            timestampProps = {
                createdAt: date,
                modifiedAt: date
            }
        }

        this._timestampProps = timestampProps;
    }

    get createdAt(): Date{
        return this._timestampProps.createdAt;
    }

    get modifiedAt(): Date{
        return this._timestampProps.modifiedAt;
    }

}