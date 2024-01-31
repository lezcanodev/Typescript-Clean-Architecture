import { UserId } from "@user/domain/user.entity";


export interface UserGenerator{
    generateNextUserId(): Promise<UserId>
}