

export const fakeUserExist = {
    existEmailUser: jest.fn<Promise<boolean>, [string]>(),
    existNickUser: jest.fn<Promise<boolean>, [string]>()
}