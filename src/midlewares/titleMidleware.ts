import {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
export const postsPostMiddleware = (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = validationResult(req);
      const errorResponse = {
        errorsMessages: errors.array({onlyFirstError: true}).map((error) =>{
              return {
                message: error.msg,
                field: error.param
              }
        })
      }
      return res.status(400).json(errorResponse);
    }
    next();
}
export const shortDescriptionMiddleware = (req: Request, res : Response, next: NextFunction) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}