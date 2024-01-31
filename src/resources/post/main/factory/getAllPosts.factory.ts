import { expressControllerAdapter } from "@common/main/adapter/expressController.adapter";
import GetAllPosts from "@post/application/getAllPosts";
import { postCRUDPostgres } from "@post/infrastructure/datasource/postgres";
import GetAllPostsController from "@post/infrastructure/http/controllers/getAllPosts.controller";

const getAllPostsUseCase = new GetAllPosts({
    postCrud: postCRUDPostgres
});


export const exGetAllPostsController = expressControllerAdapter(new GetAllPostsController({
    getAllPostsUseCase: getAllPostsUseCase
}));