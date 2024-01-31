import { UserProps } from "@user/domain/user.entity";


export interface UserFinderRepository{
    findUserByNick(nick: string): Promise<UserProps | null>,
    findUserByEmail(email: string): Promise<UserProps | null>
}   