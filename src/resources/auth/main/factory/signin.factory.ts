import Signin from "@auth/application/signin";
import SigninController from "@auth/infrastructure/http/controllers/signin.controller";
import { userFinderPostgres } from "@user/infrastructure/datasource/postgres";
import { signinValidator } from "./validators/signin.validator";
import { bcrypthash } from "@common/main/factory";
import { expressControllerAdapter } from "@common/main/adapter/expressController.adapter";
import JWTSessionManager from "@auth/infrastructure/http/sessionManager/jwtSessionManager";


const jWTSessionManager = new JWTSessionManager();

const signinUseCase = new Signin({
    hashComparator: bcrypthash,
    userFinder: userFinderPostgres,
    sessionManager: jWTSessionManager
});

export const exSigninController = expressControllerAdapter(new SigninController({
    signinUseCase: signinUseCase,
    signinValidator: signinValidator
}));