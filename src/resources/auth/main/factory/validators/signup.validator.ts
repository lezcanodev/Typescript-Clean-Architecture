
import {SignUpController} from "@auth/infrastructure/http/controllers/signup.controller";
import SignupValidator from "@auth/infrastructure/http/validators/signup.validator";
import JoiValidator from "@common/infrastructure/http/validators/JoiValidator";
import { isUnique } from "@common/infrastructure/http/validators/joiCustomValidators";
import { userRepository } from "@user/infrastructure/datasource/postgres";
import Joi from "joi";

const schemaSignup = Joi.object<SignUpController.Request['body']>({
    nick: Joi.string().required().external(isUnique({repository: userRepository, columnName: 'nick'})),
    email: Joi.string().email().required().external(isUnique({repository: userRepository, columnName: 'email'})),
    password: Joi.string().min(6).required()
});

const signupJoiValidtor = new JoiValidator<SignUpController.Request['body']>(schemaSignup);

export const signupValidator = new SignupValidator({
    validator: signupJoiValidtor
});