"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const posts_repossitory_1 = require("../repositories/posts-repossitory");
const express_validator_1 = require("express-validator");
const titleMidleware_1 = require("../midlewares/titleMidleware");
const getPostMiddleware_1 = require("../midlewares/getPostMiddleware");
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get('/', (req, res) => {
    const allPost = posts_repossitory_1.postsRepository.getAllPost();
    res.status(200).send(allPost);
});
const titlePostValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).withMessage('length title is incorrect');
const shortDescriptionPostValidation = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage('length shortDescription is not correct');
const contentPostValidation = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).withMessage('length content is not correct');
const bloggerIdPostValidation = (0, express_validator_1.body)('bloggerId').trim().isLength({ min: 1, max: 10000000000000000 }).isNumeric().withMessage('bloggers id is not correct');
exports.postRouter.post('/', titlePostValidation, shortDescriptionPostValidation, contentPostValidation, bloggerIdPostValidation, titleMidleware_1.postsPostMiddleware, (req, res) => {
    const newPost = posts_repossitory_1.postsRepository.addNewPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId);
    if (newPost) {
        return res.status(201).send(newPost);
    }
    return res.status(400).json({
        errorsMessages: [{
                message: 'bloggerId invalid',
                field: "bloggerId"
            }]
    });
});
const postGetIdPostValidation = (0, express_validator_1.param)('id').isLength({ min: 1, max: 50 }).isNumeric();
exports.postRouter.get('/:id', postGetIdPostValidation, getPostMiddleware_1.getPostMiddleware, (req, res) => {
    const id = +req.params.id;
    const post = posts_repossitory_1.postsRepository.findPost(id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    if (!post) {
        res.status(404).send("Not found");
        return;
    }
});
exports.postRouter.put('/:id', titlePostValidation, shortDescriptionPostValidation, contentPostValidation, bloggerIdPostValidation, postGetIdPostValidation, titleMidleware_1.postsPostMiddleware, (req, res) => {
    const updatePost = posts_repossitory_1.postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId);
    if (updatePost) {
        res.status(204).send(updatePost);
        return;
    }
    res.status(404).send({ errorsMessages: [{
                message: 'bloggerId invalid',
                field: "bloggerId"
            }]
    });
});
const bloggerIdDeleteValidation = (0, express_validator_1.param)('id').isNumeric();
exports.postRouter.delete('/:id', bloggerIdDeleteValidation, getPostMiddleware_1.getPostMiddleware, (req, res) => {
    const deletePost = posts_repossitory_1.postsRepository.deletePost(+req.params.id);
    if (deletePost) {
        res.status(204).send();
        return;
    }
    res.status(404).send('Not Found');
});
//# sourceMappingURL=postsRouter.js.map