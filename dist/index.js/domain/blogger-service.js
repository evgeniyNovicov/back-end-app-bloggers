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
exports.bloggerService = void 0;
const bloggers_in_memory_repository_1 = require("../repositories/bloggers-in-memory-repository");
exports.bloggerService = {
    getAllBlogger(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bloggers_in_memory_repository_1.blogerRepository.getAllBlogger(title);
        });
    },
    getBloggerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bloggers_in_memory_repository_1.blogerRepository.getBloggerId(id);
        });
    },
    addNewBlogger(name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlogger = {
                id: +(Date.now()),
                name: name,
                youtubeUrl: youtubeUrl
            };
            return yield bloggers_in_memory_repository_1.blogerRepository.addNewBlogger(newBlogger);
        });
    },
    updateBlogger(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bloggers_in_memory_repository_1.blogerRepository.updateBlogger(id, name, youtubeUrl);
        });
    },
    deleteBlogger(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bloggers_in_memory_repository_1.blogerRepository.deleteBlogger(id);
        });
    }
};
//# sourceMappingURL=blogger-service.js.map