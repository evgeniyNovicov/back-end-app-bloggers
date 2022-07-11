"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostMiddleware = void 0;
const express_validator_1 = require("express-validator");
const getPostMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorResponse = {
            errorsMessage: errors.array().map((error) => {
                return {
                    message: error.msg,
                    field: error.param
                };
            })
        };
        return res.status(400).json(errorResponse);
    }
    next();
};
exports.getPostMiddleware = getPostMiddleware;
//# sourceMappingURL=getPostMiddleware.js.map