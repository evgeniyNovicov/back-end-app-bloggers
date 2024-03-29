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
const db_1 = require("./db");
const posts = [];
exports.postsRepository = {
    addNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultPost = yield db_1.postsCollection.insertOne(newPost);
            return newPost;
        });
    },
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection.find({}).toArray();
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentPost = yield db_1.postsCollection.findOne({ id: id });
            return curentPost;
        });
    },
    updatePost(id, title, shortDescription, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ id: id }, { $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content
                } });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDeletePost = yield db_1.postsCollection.deleteOne({ id: id });
            return resultDeletePost.deletedCount === 1;
        });
    }
};
//# sourceMappingURL=posts-db-repossitory.js.map