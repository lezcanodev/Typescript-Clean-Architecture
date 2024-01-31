
import { PostId } from "@post/domain/post.entity";
import { FileId, FileProps } from "@file/domain/file.entity";
import { PostSaveDTO } from "@post/application/savePost";
import SavePost from "@post/application/savePost";
import SaveImageFile from "@file/application/SaveImageFile";
import { fakePostCRUD, fakePostGenerator, fakePostImageCrud } from "./interfaces";
import { fakeFileGenerator, fakeFileStorage } from "@tests/file/application/interfaces";

const saveFileUseCase: SaveImageFile = new SaveImageFile({
    fileGenerator: fakeFileGenerator,
    fileStorage: fakeFileStorage
})

const savePostUseCase = new SavePost({
    postCrud: fakePostCRUD,
    postGenerator: fakePostGenerator,
    postImageCrud: fakePostImageCrud,
    saveImageFileUseCase: saveFileUseCase
});

describe('savePost use Case', () => {
    
    beforeEach(jest.clearAllMocks);

    it('should create a post correctly', async () => {
        
        const fakeFile: FileProps = {
            id: new FileId(1),
            name: 'valid_name',
            size: 0,
            tempDir: 'valid_tempDir',
            type: 'jpg'
        };

        const fakePostImages = [fakeFile];

        const fakeNewPost: PostSaveDTO = {
            userId: 'valid_userId',  
            description: 'valid_description',
            postImages: fakePostImages
        };

        fakeFileGenerator.generateNextFileId.mockResolvedValue([fakeFile.id]);
        fakeFileStorage.upload.mockResolvedValue([{
            id: fakeFile.id.id, // value of fakeFile id
            publicDir: 'valid_public_dir'
        }]);
        fakePostGenerator.generateNextPostId.mockResolvedValue(new PostId('post_id'));

        await expect(savePostUseCase.run(fakeNewPost)).resolves.toStrictEqual({
            id: 'post_id',
        });

        expect(fakePostImageCrud.save).toHaveBeenCalledWith({
            postId: 'post_id',
            images: [{
                id: fakeFile.id.id,
                publicDir: 'valid_public_dir'
            }]
        });

    });


})