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
const posts = [
// {id: 0, title: "фыафыафыфыа", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"},
// {id: 1, title: "фыasdsadыафыфыа", shortDescription: "string", content: "string", bloggerId: 1, bloggerName: "string"}
];
exports.postsRepository = {
    addNewPost(title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bloggerIndex = bloggers_in_memory_repository_1.bloggers.findIndex((element) => element.id === bloggerId);
            if (bloggerIndex !== -1) {
                const newPost = {
                    id: +(Date.now()),
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId,
                    bloggerName: "sadas"
                };
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
                return true;
            }
            return false;
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
//# sourceMappingURL=posts-repossitory.js.map