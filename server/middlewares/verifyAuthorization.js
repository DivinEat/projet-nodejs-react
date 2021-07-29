const verifJWT = require("../lib/security").verifJWT;

module.exports = function verifyAuthorization(req, res, next) {
    const authorization = req.headers["Authorization"] ?? req.headers["authorization"];
    if (!authorization) {
        res.sendStatus(401);
        return;
    }
    const [type, token] = authorization.split(/\s+/);

    if ("BEARER" !== type.toUpperCase()) {
        res.sendStatus(401);
        return;
    }
    verifJWT(token)
        .then((data) => {
            req.user = data.user;
            req.merchant = data.merchant;
            next();
        })
        .catch(() => {
            res.sendStatus(401);
            res.end();
        });
    return;
};
