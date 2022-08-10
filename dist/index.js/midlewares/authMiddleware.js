"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const autorization = req.headers.authorization;
    if (!autorization) {
        res.status(401).json({ error: { message: 'No autorizated' } });
        return;
    }
    const encoded = autorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [login, password] = decoded.split(':');
    const isValidLogin = login === 'admin' ? true : false;
    const isValidPassword = password === 'qwerty' ? true : false;
    if (!isValidLogin) {
        res.status(401).json({ error: { message: 'login not found' } });
        return;
    }
    if (!isValidPassword) {
        res.status(401).json({ error: { message: 'Password not found' } });
        return;
    }
    if (isValidLogin && isValidPassword) {
        next();
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map