import JoiValidator from "@common/infrastructure/http/validators/JoiValidator";
import { validFiles } from "@common/infrastructure/http/validators/joiCustomValidators";
import {PostSaveController} from "@post/infrastructure/http/controllers/postSave.controller";
import PostSaveValidator from "@post/infrastructure/http/validators/postSave.validator";
import Joi from "joi";

const schemaPostSave = Joi.object<PostSaveController.Request>({
    body: {
        description: Joi.string().max(255)
    },
    files:{
        postImages: Joi.array().min(1).required().external(validFiles({
            extensions: ['png', 'jpg', 'jpeg']
        }))
    }
});

const postSaveJoiValidator = new JoiValidator<PostSaveController.Request>(schemaPostSave);

export const postSaveValidator = new PostSaveValidator({
    validator: postSaveJoiValidator,
});

