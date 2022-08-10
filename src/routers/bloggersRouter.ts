import {Request, Response, Router} from 'express';
import { body, param } from 'express-validator';
import { bloggerService } from '../domain/blogger-service';
import { authMiddleware } from '../midlewares/authMiddleware';
import { getBloggersMiddleware } from '../midlewares/bloggersMiddleware';
import { blogerRepository } from '../repositories/bloggers-db-repository';

export const bloggerRouter = Router({})
bloggerRouter.get('/',
    authMiddleware,
    async (req: Request, res: Response) => {
    const bloggers = await bloggerService.getAllBlogger(req.body.title)
    res.status(200).send(bloggers)
})

const postBloggerNameValidation = body('name').isString().trim().isLength({min: 1, max: 15})
const postBloggerYoutubeUrlValidation = body('youtubeUrl').isString().trim().isLength({min: 1, max: 100}).isURL()

bloggerRouter.post('/',
    postBloggerYoutubeUrlValidation,
    postBloggerNameValidation,
    getBloggersMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
        const newBlogger = await bloggerService.addNewBlogger(req.body.name, req.body.youtubeUrl)
        if (newBlogger) {
            res.status(201).send(newBlogger)
            return
        }
})

const idBLoggerValidation = param('id').isNumeric()
bloggerRouter.get('/:id',
    idBLoggerValidation,
    getBloggersMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
    const id : number = +req.params.id
    const currentBlogger = await bloggerService.getBloggerId(id)
    if (currentBlogger) {
        return res.status(200).send(currentBlogger)
    }
    res.status(404).send('Not found')
})

bloggerRouter.put('/:id',
    postBloggerNameValidation,
    postBloggerYoutubeUrlValidation,
    getBloggersMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
    const id : number = +req.params.id
    const currentUpdateBlogger = await bloggerService.updateBlogger(id, req.body.name, req.body.youtubeUrl)
    if(currentUpdateBlogger) {
        return res.status(204).send(currentUpdateBlogger)
    }
    res.status(404).send('Not Found')
})

bloggerRouter.delete('/:id',
    idBLoggerValidation,
    getBloggersMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
    const id : number = +req.params.id
    const deleteBlogger = await bloggerService.deleteBlogger(id)
    if(deleteBlogger) {
        return res.status(204).send('No Content')
    }
    res.status(404).send('Not Found')
})