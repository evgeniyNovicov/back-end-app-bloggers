import {Request, Response, Router} from 'express';
import { postsRepository } from '../repositories/posts-repossitory';
import { body, param } from 'express-validator';
import { postsPostMiddleware } from '../midlewares/titleMidleware';
import { getPostMiddleware } from '../midlewares/getPostMiddleware';
export const postRouter = Router({});

postRouter.get('/', (req: Request, res: Response) => {
    const allPost = postsRepository.getAllPost()
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
    (req: Request, res: Response) => {
    const newPost = postsRepository.addNewPost( req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId)
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
    (req: Request, res: Response) => {
    const id = +req.params.id
    const post = postsRepository.findPost(id)
    if(post) {
        res.status(200).send(post)
        return
    }
    if(!post) {
        res.status(404).send("Not found");
        return
    }
})

postRouter.put('/:id',
    titlePostValidation,
    shortDescriptionPostValidation,
    contentPostValidation,
    bloggerIdPostValidation,
    postGetIdPostValidation,
    postsPostMiddleware,
    (req: Request, res: Response) => {
        const updatePost = postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId)
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
    (req: Request, res: Response) => {
        const deletePost = postsRepository.deletePost(+req.params.id)
        if(deletePost) {
            res.status(204).send()
            return
        }
        res.status(404).send('Not Found')
})