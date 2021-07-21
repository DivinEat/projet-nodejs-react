const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

exports.decodeJWT = function decodeJWT(token) {
    return jwtDecode(token);
};

exports.verifJWT = function verifJWT(token) {
    return new Promise((res, rej) =>
        jwt.verify(token, 'process.env.JWT_SECRET', function (err, decoded) {
            if (err) rej(err);
            else res(decoded);
        })
    );
};

exports.createJWT = function createJWT(user, merchant) {
    return new Promise((res, rej) =>
        jwt.sign(
            {
                user: user,
                merchant: merchant
            },
            'process.env.JWT_SECRET',
            {algorithm: "HS512", expiresIn: 2592000},
            function (err, token) {
                if (err) rej(err);
                else res(token);
            }
        )
    );
};
