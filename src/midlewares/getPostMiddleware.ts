import {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
export const getPostMiddleware = (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = {
        errorsMessage : errors.array().map((error) => {
          return {
            message: error.msg,
            field: error.param
          }
        })
      }
      return res.status(400).json(errorResponse)
    }
    next();
}