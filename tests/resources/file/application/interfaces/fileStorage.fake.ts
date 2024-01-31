import {  SaveOuput } from "@file/application/interfaces";
import File from "@file/domain/file.entity";

export const  fakeFileStorage = {
    upload: jest.fn<Promise<SaveOuput[]>, [File[]]>(),
    removeFiles: jest.fn<Promise<void>, [File[]]>()
}