
import express from 'express';
import { authRouter } from './auth.router';


const mainAuthRouter = express.Router();


mainAuthRouter.use(authRouter);


export default mainAuthRouter;