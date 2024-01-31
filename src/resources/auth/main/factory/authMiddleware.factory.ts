import AuthMiddleware from "@auth/infrastructure/http/middlewares/auth.middleware";
import { jwtSessionManeger } from "@auth/infrastructure/http/sessionManager/jwtSessionManager";
import { expressMiddlewareAdapter } from "@common/main/adapter/expressMiddleware.adapter";



const exAuthMiddleware = expressMiddlewareAdapter(new AuthMiddleware({
    sessionManager: jwtSessionManeger
}));

export {
    exAuthMiddleware
}