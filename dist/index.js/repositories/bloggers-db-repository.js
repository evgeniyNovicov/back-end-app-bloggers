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
exports.blogerRepository = void 0;
const db_1 = require("./db");
exports.blogerRepository = {
    getAllBlogger(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = title;
            }
            return yield db_1.bloggersCollection.find(filter, { projection: { _id: 0 } }).toArray();
        });
    },
    getBloggerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentBlogger = yield db_1.bloggersCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return curentBlogger;
        });
    },
    addNewBlogger(newBlogger) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.bloggersCollection.insertOne(newBlogger);
            return newBlogger;
        });
    },
    updateBlogger(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const curentBlogger = yield db_1.bloggersCollection.updateOne({ id: id }, { $set: { name: name, youtubeUrl: youtubeUrl } });
            if (curentBlogger.matchedCount) {
                return curentBlogger;
            }
            return false;
        });
    },
    deleteBlogger(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteBloggerId = yield db_1.bloggersCollection.deleteOne({ id: id });
            if (deleteBloggerId.deletedCount) {
                return true;
            }
            return false;
        });
    }
};
//# sourceMappingURL=bloggers-db-repository.js.map