import SaveImageFile, { SaveImageFileDTO } from "@file/application/SaveImageFile";
import { fakeFileGenerator, fakeFileStorage } from "./interfaces";
import  { FileId } from "@file/domain/file.entity";

const saveFileUseCase: SaveImageFile = new SaveImageFile({
    fileGenerator: fakeFileGenerator,
    fileStorage: fakeFileStorage
});

describe('saveFileUseCase use case', () => {
    beforeEach(jest.clearAllMocks);

    it('should call saveFileUseCase.run with correct params', async () => {
        
        const fakeImages: SaveImageFileDTO[] = [{
            name: 'valid_image_name',
            size: 0,
            tempDir: 'valid_tempDir',
            type: 'jpg'
        }];

        const fakeImageIds = [new FileId(1)]

        fakeFileGenerator.generateNextFileId.mockResolvedValue(fakeImageIds);
        fakeFileStorage.upload.mockResolvedValue([{
            id: fakeImageIds[0].id,
            publicDir: 'valid_publicDir'
        }]);

        await expect(saveFileUseCase.run(fakeImages)).resolves.toStrictEqual({
            images: [{
                id: fakeImageIds[0].id,
                publicDir: 'valid_publicDir'
            }]
        });
    })

})