import BaseController from "@common/infrastructure/http/controllers/base.controller";
import { NextFunction, Request, Response } from "express";
import { parseFormDataFilesMapper } from "../mapper";


/**
 * It is Responsible for adapting the controllers for use with the express framework
 * @param controller 
 * @returns 
 */
export const expressControllerAdapter = (controller: BaseController) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try{
            const res = await controller.handle({
                body: request.body,
                files: parseFormDataFilesMapper(request)
            });

            if(res.statusCode < 200 || res.statusCode > 299){
                response.status(res.statusCode).json({
                    error: res.message
                });
            }

            return response.status(res.statusCode).json(res.body);
        }catch(error){
            next(error);
        }
    }
}