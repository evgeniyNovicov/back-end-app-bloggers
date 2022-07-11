"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bloggers_repository_1 = require("./bloggers-repository");
const posts = [
// {id: 0, title: "фыафыафыфыа", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"},
// {id: 1, title: "фыasdsadыафыфыа", shortDescription: "string", content: "string", bloggerId: 1, bloggerName: "string"}
];
exports.postsRepository = {
    addNewPost(title, shortDescription, content, bloggerId) {
        const bloggerIndex = bloggers_repository_1.bloggers.findIndex((element) => element.id === bloggerId);
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
        return false;
    },
    getAllPost() {
        return posts;
    },
    findPost(id) {
        const curentPost = posts.find((element) => element.id === id);
        if (curentPost) {
            return curentPost;
        }
        return false;
    },
    updatePost(id, title, shortDescription, content, bloggerId) {
        const curentUpdatePost = posts.find((element) => element.id === id);
        if (curentUpdatePost) {
            curentUpdatePost.title = title;
            curentUpdatePost.shortDescription = shortDescription;
            curentUpdatePost.content = content;
            curentUpdatePost.bloggerId = bloggerId;
            return curentUpdatePost;
        }
        return false;
    },
    deletePost(id) {
        const curentPostIndex = posts.findIndex((element) => element.id === id);
        if (curentPostIndex + 1) {
            const deletePost = posts[curentPostIndex];
            posts.splice(curentPostIndex, 1);
            return deletePost;
        }
        return false;
    }
};
//# sourceMappingURL=posts-repossitory.js.map