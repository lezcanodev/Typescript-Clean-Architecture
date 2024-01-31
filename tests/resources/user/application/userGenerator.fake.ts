import { UserId } from "@user/domain/user.entity";


export const fakeUserGenerator ={
     generateNextUserId: jest.fn<Promise<UserId>, [void]>()
}