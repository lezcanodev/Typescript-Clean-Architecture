import BaseController from "@common/infrastructure/http/controllers/base.controller";
import { ok } from "@common/infrastructure/http/helper";
import { HttpRequest, HTTPResponse, ValidatorRequest } from "@common/infrastructure/http/interfaces";
import GetAllPosts from "@post/application/getAllPosts";


export namespace GetAllPostsController{
    export type Request = HttpRequest<any, any, any, any>
    export type Response = HTTPResponse<any>
}

export interface GetAllPostsControllerParams{
    readonly getAllPostsUseCase: GetAllPosts,
    //readonly validatorRequest: ValidatorRequest<GetAllPostsController.Request>
}

export default class GetAllPostsController extends BaseController{
    
    public constructor(private readonly params: GetAllPostsControllerParams){
        super()
    }

    protected async execute(httpRequest: GetAllPostsController.Request): Promise<GetAllPostsController.Response> {
            const posts = await this.params.getAllPostsUseCase.run();
            const response = ok();
            response.body = {
                data: []
            };
            return response;
    }

}