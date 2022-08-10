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
exports.bloggerRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const blogger_service_1 = require("../domain/blogger-service");
const authMiddleware_1 = require("../midlewares/authMiddleware");
const bloggersMiddleware_1 = require("../midlewares/bloggersMiddleware");
exports.bloggerRouter = (0, express_1.Router)({});
exports.bloggerRouter.get('/', 
// authMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggers = yield blogger_service_1.bloggerService.getAllBlogger(req.body.title);
    res.status(200).send(bloggers);
}));
const postBloggerNameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 });
const postBloggerYoutubeUrlValidation = (0, express_validator_1.body)('youtubeUrl').isString().trim().isLength({ min: 1, max: 100 }).isURL();
exports.bloggerRouter.post('/', postBloggerYoutubeUrlValidation, postBloggerNameValidation, bloggersMiddleware_1.getBloggersMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogger = yield blogger_service_1.bloggerService.addNewBlogger(req.body.name, req.body.youtubeUrl);
    if (newBlogger) {
        res.status(201).send(newBlogger);
        return;
    }
}));
const idBLoggerValidation = (0, express_validator_1.param)('id').isNumeric();
exports.bloggerRouter.get('/:id', idBLoggerValidation, bloggersMiddleware_1.getBloggersMiddleware, 
// authMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const currentBlogger = yield blogger_service_1.bloggerService.getBloggerId(id);
    if (currentBlogger) {
        return res.status(200).send(currentBlogger);
    }
    res.status(404).send('Not found');
}));
exports.bloggerRouter.put('/:id', postBloggerNameValidation, postBloggerYoutubeUrlValidation, bloggersMiddleware_1.getBloggersMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const currentUpdateBlogger = yield blogger_service_1.bloggerService.updateBlogger(id, req.body.name, req.body.youtubeUrl);
    if (currentUpdateBlogger) {
        return res.status(204).send(currentUpdateBlogger);
    }
    res.status(404).send('Not Found');
}));
exports.bloggerRouter.delete('/:id', idBLoggerValidation, bloggersMiddleware_1.getBloggersMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const deleteBlogger = yield blogger_service_1.bloggerService.deleteBlogger(id);
    if (deleteBlogger) {
        return res.status(204).send('No Content');
    }
    res.status(404).send('Not Found');
}));
//# sourceMappingURL=bloggersRouter.js.map