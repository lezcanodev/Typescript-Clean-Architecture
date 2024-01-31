import { SessionDataResponse } from "@auth/infrastructure/http/interfaces"
import BaseController from "@common/infrastructure/http/controllers/base.controller"
import { created } from "@common/infrastructure/http/helper"
import { HttpRequest, HTTPResponse, ValidatorRequest } from "@common/infrastructure/http/interfaces"
import { FileHttpRequest as HttpFile } from "@common/infrastructure/http/interfaces/file"
import  SavePost, { PostSaveDTO } from "@post/application/savePost"
import { SaveImageFileDTO } from "@file/application/SaveImageFile"


export namespace PostSaveController{
    export type Request = HttpRequest<Omit<PostSaveDTO, 'userId' | 'postImages'> & SessionDataResponse, any, any, any>
    export type Response = HTTPResponse<any>
}

export interface PostSaveControllerParams{
    readonly postSaveUseCase: SavePost,
    readonly validatorRequest: ValidatorRequest<PostSaveController.Request>
}

export default class PostSaveController extends BaseController{

    public constructor(private readonly params: PostSaveControllerParams){
        super({
            validatorRequest: params.validatorRequest
        });
    }       

    protected async execute(httpRequest: PostSaveController.Request): Promise<PostSaveController.Response> {
        try{
            const bodyRequest = httpRequest.body;
            const postImages = httpRequest.files!['postImages'].map((file: HttpFile): SaveImageFileDTO => {
                return {
                    name: file.name,
                    type: file.fileExtension,
                    size: file.size,
                    tempDir: file.tempDir
                }
            });
            
            const newPost = await this.params.postSaveUseCase.run({
                userId: bodyRequest!.sessionData.userId,
                description: bodyRequest!.description,
                postImages: postImages
            });
            
            const response = created();
            response.body = {
                postId: newPost.id
            }

            return response;
      
        }catch(error){
            throw error;
        }
    }

}