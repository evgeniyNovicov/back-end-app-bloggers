"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggerRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bloggersMiddleware_1 = require("../midlewares/bloggersMiddleware");
const bloggers_repository_1 = require("../repositories/bloggers-repository");
exports.bloggerRouter = (0, express_1.Router)({});
exports.bloggerRouter.get('/', (req, res) => {
    const bloggers = bloggers_repository_1.blogerRepository.getAllBlogger();
    res.status(200).send(bloggers);
});
const postBloggerNameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 });
const postBloggerYoutubeUrlValidation = (0, express_validator_1.body)('youtubeUrl').isString().trim().isLength({ min: 1, max: 100 }).isURL();
exports.bloggerRouter.post('/', postBloggerNameValidation, postBloggerYoutubeUrlValidation, bloggersMiddleware_1.getBloggersMiddleware, (req, res) => {
    const newBlogger = bloggers_repository_1.blogerRepository.addNewBlogger(req.body.name, req.body.youtubeUrl);
    if (newBlogger) {
        res.status(201).send(newBlogger);
        return;
    }
    res.status(400).send({
        "errorsMessages": [
            {
                "message": "string",
                "field": "string"
            }
        ]
    });
});
const idBLoggerValidation = (0, express_validator_1.param)('id').isNumeric();
exports.bloggerRouter.get('/:id', idBLoggerValidation, bloggersMiddleware_1.getBloggersMiddleware, (req, res) => {
    const id = +req.params.id;
    const currentBlogger = bloggers_repository_1.blogerRepository.getBloggerId(id);
    if (currentBlogger) {
        return res.status(200).send(currentBlogger);
    }
    res.status(404).send('Not found');
});
exports.bloggerRouter.put('/:id', postBloggerNameValidation, postBloggerYoutubeUrlValidation, bloggersMiddleware_1.getBloggersMiddleware, (req, res) => {
    const id = +req.params.id;
    const currentUpdateBlogger = bloggers_repository_1.blogerRepository.updateBlogger(id, req.body.name, req.body.youtubeUrl);
    if (currentUpdateBlogger) {
        return res.status(204).send(currentUpdateBlogger);
    }
    res.status(404).send('Not Found');
});
exports.bloggerRouter.delete('/:id', idBLoggerValidation, bloggersMiddleware_1.getBloggersMiddleware, (req, res) => {
    const id = +req.params.id;
    const deleteBlogger = bloggers_repository_1.blogerRepository.deleteBlogger(id);
    if (deleteBlogger) {
        return res.status(204).send('No Content');
    }
    res.status(404).send('Not Found');
});
//# sourceMappingURL=bloggersRouter.js.map