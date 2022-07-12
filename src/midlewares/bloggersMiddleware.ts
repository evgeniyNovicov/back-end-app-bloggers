import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
export const getBloggersMiddleware = (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = {
        errorsMessage : errors.array({onlyFirstError: true}).map((error) => {
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