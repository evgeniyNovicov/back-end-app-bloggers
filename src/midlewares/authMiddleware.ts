import {NextFunction, Request, Response} from 'express';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const autorization = req.headers.authorization;
    if(!autorization) {
        res.status(404).json({error: {message: 'No autorizated'}})
        return
    }
    const encoded = autorization.substring(6)
    const decoded = Buffer.from(encoded, 'base64').toString()
    const [login, password] = decoded.split(':')
    const isValidLogin = login === 'admin' ? true : false
    const isValidPassword = password === 'qwerty' ? true : false
    if(!isValidLogin) {
        res.status(404).json({error: {message: 'login not found'}})
        return
    }
    if(!isValidPassword) {
        res.status(404).json({error: {message: 'Password not found'}})
        return
    }
    if(isValidLogin && isValidPassword) {
        next();
    }
}