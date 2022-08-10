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
exports.postsService = void 0;
const bloggers_in_memory_repository_1 = require("../repositories/bloggers-in-memory-repository");
const posts_in_memory_repossitory_1 = require("../repositories/posts-in-memory-repossitory");
const posts = [];
exports.postsService = {
    addNewPost(title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bloggerIndexDb = yield bloggers_in_memory_repository_1.blogerRepository.getBloggerId(bloggerId);
            if (bloggerIndexDb) {
                const newPost = {
                    id: +(Date.now()),
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId,
                    bloggerName: "Evgeniy"
                };
                return posts_in_memory_repossitory_1.postsRepository.addNewPost(newPost);
            }
            return null;
        });
    },
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_in_memory_repossitory_1.postsRepository.getAllPost();
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_in_memory_repossitory_1.postsRepository.findPost(id);
        });
    },
    updatePost(id, title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultBloggerId = yield bloggers_in_memory_repository_1.blogerRepository.getBloggerId(bloggerId);
            if (resultBloggerId) {
                return posts_in_memory_repossitory_1.postsRepository.updatePost(id, title, shortDescription, content, bloggerId);
            }
            if (!resultBloggerId) {
                return "not found blogger id";
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDeletePost = posts_in_memory_repossitory_1.postsRepository.deletePost(id);
            return resultDeletePost;
        });
    }
};
//# sourceMappingURL=post-service.js.map