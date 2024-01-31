import DomainTypeError from "./domainTypeError";

/**
 * Entity id Properties
 */
export interface EntityIdProps<T>{
    readonly id: T
}


/**
 * Represents a Entity Id is an object value
 */
export class EntityId<T>{
    private readonly _props: EntityIdProps<T>;

    constructor(props: EntityIdProps<T>){
        
        const {id} = props;

        if(!id || id === null || typeof id === 'undefined'){
            throw new DomainTypeError('id must not be null');
        }

        this._props = props;
    }

    get id(): T{
        return this._props.id;
    }
}