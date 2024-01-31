import express from 'express';
import { exSignupController } from '../factory';
import { exSigninController } from '../factory/signin.factory';
import { exAuthMiddleware } from '../factory/authMiddleware.factory';

const authRouter = express.Router();


authRouter.post('/signup', exSignupController);
authRouter.post('/signin', exSigninController);

export {authRouter};