import mainAuthRouter from '@auth/main/router';
import { internalServerError } from '@common/infrastructure/http/helper';
import { mainPostRouter } from '@post/main/router';
import express, { NextFunction, Request, Response } from 'express';


const app = express();

// Middlewares
app.use(express.static(`${process.env.LOCAL_STORAGE_PUBLIC_DIR}/images`))
app.use(express.json());

// Routers
app.use('/auth',  mainAuthRouter);
app.use('/posts', mainPostRouter);

// Handling error
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    const response = internalServerError();
    
    console.log(error);

    res.status(response.statusCode).json({
        error: response.message
    });
})

export function serverExpress(config: {port:number}){
    const {port} = config;
    const server = app.listen(port, () => console.log(`Running in port ${port}`));
    return {app, server}
}