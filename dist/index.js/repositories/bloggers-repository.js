"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogerRepository = exports.bloggers = void 0;
exports.bloggers = [
    { id: 0, name: "Parker", youtubeUrl: "https://www.youtube.com/" },
    { id: 1, name: "Smith", youtubeUrl: "https://www.youtube.com/" }
];
exports.blogerRepository = {
    getAllBlogger() {
        return exports.bloggers;
    },
    getBloggerId(id) {
        const curentBlogger = exports.bloggers.find((element) => element.id === id);
        return curentBlogger;
    },
    addNewBlogger(name, youtubeUrl) {
        const newBlogger = {
            id: +(Date.now()),
            name: name,
            youtubeUrl: youtubeUrl
        };
        exports.bloggers.push(newBlogger);
        return newBlogger;
    },
    updateBlogger(id, name, youtubeUrl) {
        const curentBlogger = exports.bloggers.find((element) => element.id === id);
        if (curentBlogger) {
            curentBlogger.name = name;
            curentBlogger.youtubeUrl = youtubeUrl;
            return curentBlogger;
        }
        return false;
    },
    deleteBlogger(id) {
        const deleteBloggerId = exports.bloggers.findIndex((element) => element.id === id);
        if (deleteBloggerId + 1) {
            const deleteBlogger = exports.bloggers[deleteBloggerId];
            exports.bloggers.splice(deleteBloggerId, 1);
            return exports.bloggers;
        }
    }
};
//# sourceMappingURL=bloggers-repository.js.map