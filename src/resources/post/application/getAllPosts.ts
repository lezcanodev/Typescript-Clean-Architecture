import { UseCase } from "@common/application/usescases";
import { PostCrudGetAllPostsOutput, PostCrudRepository } from "./interfaces/postCRUD.repository";

export type GetAllPostsDTO = void;

export type OutputGetAllPosts = PostCrudGetAllPostsOutput[];

export interface GetAllPostsParams{
    readonly postCrud: PostCrudRepository
}


export default class GetAllPosts implements UseCase<GetAllPostsDTO, OutputGetAllPosts>{
    
    public constructor(private readonly params: GetAllPostsParams){}

    async run(input: void): Promise<OutputGetAllPosts> {
        const allPosts = await this.params.postCrud.getAllPosts({
            joinUser: true
        });
        return allPosts; 
    }

}