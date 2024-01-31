import { GenerateNextFileIdOptions } from "@file/application/interfaces";
import { FileId } from "@file/domain/file.entity";


export const fakeFileGenerator = {
    generateNextFileId: jest.fn<Promise<FileId[]>, [GenerateNextFileIdOptions]>()
}