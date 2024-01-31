
import {PostImageCrudParams} from '@post/application/interfaces'

export const fakePostImageCrud = {
    save: jest.fn<Promise<void>, [PostImageCrudParams.Save]>()
}