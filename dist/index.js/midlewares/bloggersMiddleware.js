"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBloggersMiddleware = void 0;
const express_validator_1 = require("express-validator");
const getBloggersMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        });
    }
    next();
};
exports.getBloggersMiddleware = getBloggersMiddleware;
//# sourceMappingURL=bloggersMiddleware.js.map