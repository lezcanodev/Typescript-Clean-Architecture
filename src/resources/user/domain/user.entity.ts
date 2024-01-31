import UserDomainError from "./userDomainError";
import {EntityId} from "@common/domain/types";


export type UserIdDataType = string;

export class UserId extends EntityId<UserIdDataType>{
    constructor(id: string){
        super({
            id: id
        });
    }
}

/**
 * User properties
 */
export interface UserProps{
    id: UserId,
    nick: string,
    email: string,
    passwordHash: string,
    description?: string,
}


/**
 * Represents the User entity
 */
export default class User{

    /**
     * @param userProps user properties
     */
    private constructor(private readonly _userProps: UserProps) {}

    get id(): UserId{
        return this._userProps.id;
    }
    
    get idValue(): UserIdDataType{
        return this._userProps.id.id;
    }

    get nick(): string{
        return this._userProps.nick;
    }

    get email(): string{
        return this._userProps.email;
    }

    get passwordHash(): string{
        return this._userProps.passwordHash;
    }

    get description(): string{
        return this._userProps.description || '';
    }

    /**
     * build and return a new User
     * @param postProps properties to build a new User
     * @returns new User
     */
    public static build(userProps: UserProps): User{

        if(userProps.nick.split(' ').length > 1){
            throw new UserDomainError('nick must no have spaces');
        }

        return new User(userProps);
    }

}

