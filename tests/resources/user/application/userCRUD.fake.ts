import User from "@user/domain/user.entity";

export const fakeUserCRUD = {
    save: jest.fn<Promise<void>, [User]>()
}