import { exAuthMiddleware } from '@auth/main/factory/authMiddleware.factory';
import express from 'express';
import { exPostSaveController } from '../factory/postSave.factory';
import { uploadFiles } from '@common/main/factory';
import { exGetAllPostsController } from '../factory/getAllPosts.factory';
const postRouter = express.Router();


postRouter.get('/', 
    exGetAllPostsController
);

postRouter.post('/', 
    uploadFiles({
        nameFields: [{nameField: 'postImages'}]
    }),
    exAuthMiddleware,
    exPostSaveController
);

export {postRouter}