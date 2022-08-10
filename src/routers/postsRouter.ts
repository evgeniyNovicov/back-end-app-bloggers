import {Request, Response, Router} from 'express';
import { body, param } from 'express-validator';
import { postsPostMiddleware } from '../midlewares/titleMidleware';
import { getPostMiddleware } from '../midlewares/getPostMiddleware';
import { postsService } from '../domain/post-service';
import { authMiddleware } from '../midlewares/authMiddleware';
export const postRouter = Router({});

postRouter.get('/',
    authMiddleware,
    async (req: Request, res: Response) => {
    const allPost = await postsService.getAllPost()
    res.status(200).send(allPost)
})

const titlePostValidation = body('title').trim().isLength({min: 1, max: 30}).withMessage('length title is incorrect');
const shortDescriptionPostValidation = body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage('length shortDescription is not correct');
const contentPostValidation = body('content').trim().isLength({min: 1, max: 1000}).withMessage('length content is not correct');
const bloggerIdPostValidation = body('bloggerId').trim().isLength({min: 1, max: 10000000000000000}).isNumeric().withMessage('bloggers id is not correct');

postRouter.post('/',
    titlePostValidation,
    shortDescriptionPostValidation,
    contentPostValidation,
    bloggerIdPostValidation,
    postsPostMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
    const newPost = await postsService.addNewPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId)
    if(newPost){
        return res.status(201).send(newPost)
    }
    return res.status(400).json({
        errorsMessages: [{
            message: 'bloggerId invalid',
            field: "bloggerId"
        }]
    })
})

const postGetIdPostValidation = param('id').isLength({min: 1, max: 50}).isNumeric()
postRouter.get('/:id',
    postGetIdPostValidation,
    getPostMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
    const id = +req.params.id
    const post =  await postsService.findPost(id)
    if(post) {
        return res.status(200).send(post)
    }
    if(!post) {
        return res.status(404).send("Not found");
    }
})

postRouter.put('/:id',
    titlePostValidation,
    shortDescriptionPostValidation,
    contentPostValidation,
    bloggerIdPostValidation,
    postGetIdPostValidation,
    postsPostMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
        const updatePost = await postsService.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId)
        if(updatePost === "not found blogger id") {
            res.status(400).send({ errorsMessages: [{
                message: 'bloggerId invalid',
                field: "bloggerId" }]
            })
            return
        }
        if(updatePost) {
            res.status(204).send(updatePost)
            return
        }
        res.status(404).send({ errorsMessages: [{
            message: 'bloggerId invalid',
            field: "bloggerId" }]
        })
})

const bloggerIdDeleteValidation = param('id').isNumeric();
postRouter.delete('/:id',
    bloggerIdDeleteValidation,
    getPostMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
        const deletePost = await postsService.deletePost(+req.params.id)
        if(deletePost) {
            return res.status(204).send()
        }
        res.status(404).send('Not Found')
})