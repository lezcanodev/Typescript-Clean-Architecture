import BaseMiddleware from "@common/infrastructure/http/middlewares/base.middleware";
import { NextFunction, Request, Response } from "express";

/**
 * It is Responsible for adapting the middlewares for use with the express framework
 * @param middleware 
 * @returns 
 */
export const expressMiddlewareAdapter = (middleware: BaseMiddleware) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try{
            const res = await middleware.handle({
                body: request.body,
                headers: request.headers as {[header: string]: string}
            });

            if(res.statusCode != 200){
                response.status(res.statusCode).json({
                    error: res.message
                });
                return;
            }
    
            Object.assign(request.body, res.body);
            Object.assign(request.headers, res.headers);
            
            next();
        }catch(error){
            next(error);
        }
    }
}