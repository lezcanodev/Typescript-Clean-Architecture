import { expressControllerAdapter } from "@common/main/adapter/expressController.adapter";
import SavePost from "@post/application/savePost";
import { postCRUDPostgres, postGeneratorPosgres, postImageCrudPostgres } from "@post/infrastructure/datasource/postgres";
import PostSaveController from "@post/infrastructure/http/controllers/postSave.controller";
import { postSaveValidator } from "./validators/postSave.validator";
import SaveImageFile from "@file/application/SaveImageFile";
import { localImagesStorage } from "@file/infrastructure/fileStorage/";
import { postImageGeneratorPosgres } from "@post/infrastructure/datasource/postgres/postImageGenerator";

export const postSaveFileStorageRepository = localImagesStorage;

const saveFileUseCase = new SaveImageFile({
    fileStorage: postSaveFileStorageRepository,
    fileGenerator: postImageGeneratorPosgres
})

const postSaveUseCase = new SavePost({
    postCrud: postCRUDPostgres,
    postImageCrud: postImageCrudPostgres,
    postGenerator: postGeneratorPosgres,
    saveImageFileUseCase: saveFileUseCase
});


export const exPostSaveController = expressControllerAdapter(new PostSaveController({
    postSaveUseCase: postSaveUseCase,
    validatorRequest: postSaveValidator
}));