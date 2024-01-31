import express from 'express';
import { postRouter } from './post.router';

const mainPostRouter = express.Router();


mainPostRouter.use(postRouter);


export {mainPostRouter}