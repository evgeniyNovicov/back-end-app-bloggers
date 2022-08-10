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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bloggersRouter_1 = require("./routers/bloggersRouter");
const postsRouter_1 = require("./routers/postsRouter");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
exports.counter = 0;
// const autorizationMiddleware = (req: Request, res: Response, next : NextFunction) => {
//   counter++
//   next()
// }
// app.use(autorizationMiddleware)
app.use((0, body_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/bloggers', bloggersRouter_1.bloggerRouter);
app.use('/posts', postsRouter_1.postRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
//# sourceMappingURL=index.js.map