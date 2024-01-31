import { HashComparator, HashGenerator } from "@common/application/interfaces";



export const fakeHashGenerator = {
    hash: jest.fn<Promise<string>, [string]>()
}


export const fakeHashComparator = {
    compare: jest.fn<Promise<boolean>, [string, string]>()
}

