import {Request, Response, Router} from 'express';
import { body, param } from 'express-validator';
import { getBloggersMiddleware } from '../midlewares/bloggersMiddleware';
import { blogerRepository } from '../repositories/bloggers-repository';

export const bloggerRouter = Router({})
bloggerRouter.get('/', (req: Request, res: Response) => {
    const bloggers = blogerRepository.getAllBlogger()
    res.status(200).send(bloggers)
})

const postBloggerNameValidation = body('name').isString().trim().isLength({min: 1, max: 15})
const postBloggerYoutubeUrlValidation = body('youtubeUrl').isString().trim().isLength({min: 1, max: 100}).isURL()

bloggerRouter.post('/',
    postBloggerNameValidation,
    postBloggerYoutubeUrlValidation,
    getBloggersMiddleware,
    (req: Request, res: Response) => {
        const newBlogger = blogerRepository.addNewBlogger(req.body.name, req.body.youtubeUrl)
        if (newBlogger) {
            res.status(201).send(newBlogger)
            return
        }
        res.status(400).send({
            "errorsMessages": [
                {
                "message": "string",
                "field": "string"
                }
            ]
        })
})

const idBLoggerValidation = param('id').isNumeric()
bloggerRouter.get('/:id',
    idBLoggerValidation,
    getBloggersMiddleware,
    (req: Request, res: Response) => {
    const id : number = +req.params.id
    const currentBlogger = blogerRepository.getBloggerId(id)
    if (currentBlogger) {
        return res.status(200).send(currentBlogger)
    }
    res.status(404).send('Not found')
})

bloggerRouter.put('/:id',
    postBloggerNameValidation,
    postBloggerYoutubeUrlValidation,
    getBloggersMiddleware,
    (req: Request, res: Response) => {
    const id : number = +req.params.id
    const currentUpdateBlogger = blogerRepository.updateBlogger(id, req.body.name, req.body.youtubeUrl)
    if(currentUpdateBlogger) {
        return res.status(204).send(currentUpdateBlogger)
    }
    res.status(404).send('Not Found')
})

bloggerRouter.delete('/:id',
    idBLoggerValidation,
    getBloggersMiddleware,
    (req: Request, res: Response) => {
    const id : number = +req.params.id
    const deleteBlogger = blogerRepository.deleteBlogger(id)
    if(deleteBlogger) {
        return res.status(204).send('No Content')
    }
    res.status(404).send('Not Found')
})