import {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
export const getPostMiddleware = (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        "errorsMessages": [
          {
            "message": "string",
            "field": "string"
          }
        ]
      })
    }
    next();
}