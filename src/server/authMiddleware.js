function authMiddleware(req, res, next) {
    if (req.url.startsWith('/auth')) {
        next();
        return;
    }

    if (req.cookies && req.cookies.T) {
        next();
    } else {
        res.status(401).send();
    }
}

export default authMiddleware;
