import { UserProps } from "@user/domain/user.entity";


export const fakeUserFinder = { 
    findUserByEmail: jest.fn<Promise<UserProps | null>, [string]>(),
    findUserByNick: jest.fn<Promise<UserProps | null>, [string]>()
}