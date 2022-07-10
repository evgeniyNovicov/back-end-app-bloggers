"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsPostMiddleware = void 0;
const express_validator_1 = require("express-validator");
const postsPostMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: {
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            } });
    }
    next();
};
exports.postsPostMiddleware = postsPostMiddleware;
// export const shortDescriptionMiddleware = (req: Request, res : Response, next: NextFunction) => {
//   const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// }
//# sourceMappingURL=titleMidleware%20copy.js.map