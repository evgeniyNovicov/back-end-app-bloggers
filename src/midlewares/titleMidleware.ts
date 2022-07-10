import {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
export const postsPostMiddleware = (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: {
        "errorsMessages": [
          {
            "message": "string",
            "field": "string"
          }
        ]
      }});
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