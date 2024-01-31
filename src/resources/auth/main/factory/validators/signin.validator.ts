
import {SigninController} from "@auth/infrastructure/http/controllers/signin.controller";
import SigninValidator from "@auth/infrastructure/http/validators/signin.validator";
import JoiValidator from "@common/infrastructure/http/validators/JoiValidator";
import Joi from "joi";

const schemaSignin = Joi.object<SigninController.Request['body']>({
    nickOrEmail: Joi.string().required(),
    password: Joi.string().required()
});

const signinJoiValidtor = new JoiValidator<SigninController.Request['body']>(schemaSignin);

export const signinValidator = new SigninValidator({
    validator: signinJoiValidtor
});