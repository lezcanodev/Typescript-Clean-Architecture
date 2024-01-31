import SignUp from "@auth/application/signup";
import SignUpController from "@auth/infrastructure/http/controllers/signup.controller";
import { expressControllerAdapter } from "@common/main/adapter/expressController.adapter";
import { bcrypthash } from "@common/main/factory";
import { userCRUDPostgres } from "@user/infrastructure/datasource/postgres";
import { userExistPostgres, userGeneratorPosgres } from "@user/infrastructure/datasource/postgres/";
import { signupValidator } from "@auth/main/factory/validators";


const signupUseCase = new SignUp({
    hashGenerator: bcrypthash,
    userCRUD: userCRUDPostgres,
    userGenerator: userGeneratorPosgres,
    userExist: userExistPostgres,
});

const exSignupController = expressControllerAdapter(new SignUpController({
    signupUseCase: signupUseCase,
    signupValidator: signupValidator
}));

export {exSignupController}