import { OutputPostSave, PostSaveDTO } from "@post/application/savePost";


export const fakeSavePostUseCase = {
    run: jest.fn<Promise<OutputPostSave>, [PostSaveDTO]>()
};