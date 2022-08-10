"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const titleMidleware_1 = require("../midlewares/titleMidleware");
const getPostMiddleware_1 = require("../midlewares/getPostMiddleware");
const post_service_1 = require("../domain/post-service");
const authMiddleware_1 = require("../midlewares/authMiddleware");
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get('/', 
// authMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPost = yield post_service_1.postsService.getAllPost();
    res.status(200).send(allPost);
}));
const titlePostValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).withMessage('length title is incorrect');
const shortDescriptionPostValidation = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage('length shortDescription is not correct');
const contentPostValidation = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).withMessage('length content is not correct');
const bloggerIdPostValidation = (0, express_validator_1.body)('bloggerId').trim().isLength({ min: 1, max: 10000000000000000 }).isNumeric().withMessage('bloggers id is not correct');
exports.postRouter.post('/', titlePostValidation, shortDescriptionPostValidation, contentPostValidation, bloggerIdPostValidation, titleMidleware_1.postsPostMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield post_service_1.postsService.addNewPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId);
    if (newPost) {
        return res.status(201).send(newPost);
    }
    return res.status(400).json({
        errorsMessages: [{
                message: 'bloggerId invalid',
                field: "bloggerId"
            }]
    });
}));
const postGetIdPostValidation = (0, express_validator_1.param)('id').isLength({ min: 1, max: 50 }).isNumeric();
exports.postRouter.get('/:id', postGetIdPostValidation, getPostMiddleware_1.getPostMiddleware, 
// authMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const post = yield post_service_1.postsService.findPost(id);
    if (post) {
        return res.status(200).send(post);
    }
    if (!post) {
        return res.status(404).send("Not found");
    }
}));
exports.postRouter.put('/:id', titlePostValidation, shortDescriptionPostValidation, contentPostValidation, bloggerIdPostValidation, postGetIdPostValidation, titleMidleware_1.postsPostMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePost = yield post_service_1.postsService.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId);
    if (updatePost === "not found blogger id") {
        res.status(400).send({ errorsMessages: [{
                    message: 'bloggerId invalid',
                    field: "bloggerId"
                }]
        });
        return;
    }
    if (updatePost) {
        res.status(204).send(updatePost);
        return;
    }
    res.status(404).send({ errorsMessages: [{
                message: 'bloggerId invalid',
                field: "bloggerId"
            }]
    });
}));
const bloggerIdDeleteValidation = (0, express_validator_1.param)('id').isNumeric();
exports.postRouter.delete('/:id', bloggerIdDeleteValidation, getPostMiddleware_1.getPostMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletePost = yield post_service_1.postsService.deletePost(+req.params.id);
    if (deletePost) {
        return res.status(204).send();
    }
    res.status(404).send('Not Found');
}));
//# sourceMappingURL=postsRouter.js.map