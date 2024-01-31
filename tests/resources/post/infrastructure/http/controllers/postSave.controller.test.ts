import { created } from "@common/infrastructure/http/helper";
import { ErrorValidator } from "@common/infrastructure/http/interfaces";
import PostSaveController, {PostSaveController as PostSaveControllerNamespace} from "@post/infrastructure/http/controllers/postSave.controller";
import { fakeSavePostUseCase } from "@tests/post/application/savePost.fake";

const fakeValidatorRequestSavePost = {
    validate: jest.fn<Promise<ErrorValidator>, any>()
}

const postSaveController = new PostSaveController({
    postSaveUseCase: fakeSavePostUseCase as any,
    validatorRequest: fakeValidatorRequestSavePost as any
});

describe('PostSaveController' , () => {
    beforeEach(jest.clearAllMocks);

    it('should return 201 created', async () => {
        const fakeSavePostRequest: PostSaveControllerNamespace.Request = {
            body: {
                description: 'description',
                sessionData: {
                    userId: 'user_id'
                }
            },
            files: {
                'postImages': [{
                    fileExtension: 'jpg',
                    mimetype: 'mimetype',
                    name: 'name',
                    originalname: 'originalname',
                    size: 1,
                    tempDir: 'tempDir'
                }]
            }
        }

        fakeValidatorRequestSavePost.validate.mockResolvedValue({ errors: [] });
        fakeSavePostUseCase.run.mockResolvedValue({ id: 'post_id' });

        const response = created();
        response.body = {
            postId: 'post_id'
        }

        await expect(postSaveController.handle(fakeSavePostRequest)).resolves.toStrictEqual(response)
        
        expect(fakeSavePostUseCase.run).toHaveBeenCalledWith({
            userId: fakeSavePostRequest.body!.sessionData.userId,
            description: fakeSavePostRequest.body!.description,
            postImages: [{
                name: fakeSavePostRequest.files!['postImages'][0].name,
                type: fakeSavePostRequest.files!['postImages'][0].fileExtension,
                size: fakeSavePostRequest.files!['postImages'][0].size,
                tempDir: fakeSavePostRequest.files!['postImages'][0].tempDir
            }]
        });

    })

})