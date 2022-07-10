"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortDescriptionMiddleware = exports.postsPostMiddleware = void 0;
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
const shortDescriptionMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.shortDescriptionMiddleware = shortDescriptionMiddleware;
//# sourceMappingURL=titleMidleware.js.map