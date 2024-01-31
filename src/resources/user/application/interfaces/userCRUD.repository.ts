import User, { UserProps } from "@user/domain/user.entity";



export interface UserCRUDRepository{
    save(user: User): Promise<void>;
}
