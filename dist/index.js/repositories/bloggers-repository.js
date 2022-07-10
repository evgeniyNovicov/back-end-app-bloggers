"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogerRepository = void 0;
const bloggers = [
    { id: 0, name: "Parker", youtubeUrl: "https://www.youtube.com/" },
    { id: 1, name: "Smith", youtubeUrl: "https://www.youtube.com/" }
];
exports.blogerRepository = {
    getAllBlogger() {
        return bloggers;
    },
    getBloggerId(id) {
        const curentBlogger = bloggers.find((element) => element.id === id);
        return curentBlogger;
    },
    addNewBlogger(name, youtubeUrl) {
        const newBlogger = {
            id: +(Date.now()),
            name: name,
            youtubeUrl: youtubeUrl
        };
        bloggers.push(newBlogger);
        return newBlogger;
    },
    updateBlogger(id, name, youtubeUrl) {
        const curentBlogger = bloggers.find((element) => element.id === id);
        if (curentBlogger) {
            curentBlogger.name = name;
            curentBlogger.youtubeUrl = youtubeUrl;
            return curentBlogger;
        }
        return false;
    },
    deleteBlogger(id) {
        const deleteBlogger = bloggers.find((element) => element.id === id);
        if (deleteBlogger) {
            const deleteBlogger = posts[deleteBlogger];
            bloggers.splice(curentPostIndex, 1);
            return deletePost;
        }
    }
};
//# sourceMappingURL=bloggers-repository.js.map