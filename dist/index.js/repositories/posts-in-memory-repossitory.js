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
exports.postsRepository = void 0;
const bloggers_in_memory_repository_1 = require("./bloggers-in-memory-repository");
const posts = [];
exports.postsRepository = {
    addNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const bloggerIndex = bloggers_in_memory_repository_1.bloggers.findIndex((element) => element.id === newPost.bloggerId);
            if (bloggerIndex !== -1) {
                posts.push(newPost);
                return newPost;
            }
            return null;
        });
    },
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            return posts;
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentPost = posts.find((element) => element.id === id);
            if (curentPost) {
                return curentPost;
            }
            return null;
        });
    },
    updatePost(id, title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentUpdatePost = posts.find((element) => element.id === id);
            const curentBloggersId = bloggers_in_memory_repository_1.bloggers.find((element) => element.id === bloggerId);
            if (curentUpdatePost && curentBloggersId) {
                curentUpdatePost.title = title;
                curentUpdatePost.shortDescription = shortDescription;
                curentUpdatePost.content = content;
                curentUpdatePost.bloggerId = bloggerId;
                return curentUpdatePost;
            }
            if (!curentBloggersId) {
                return "not found blogger id";
            }
            return false;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentPostIndex = posts.findIndex((element) => element.id === id);
            if (curentPostIndex !== -1) {
                const deletePost = posts[curentPostIndex];
                posts.splice(curentPostIndex, 1);
                return deletePost;
            }
            return false;
        });
    }
};
//# sourceMappingURL=posts-in-memory-repossitory.js.map