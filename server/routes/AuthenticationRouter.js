const {Router} = require("express");
const createJWT = require("../lib/security").createJWT;

const router = Router();

router.post("/login", (req, res) => {
    const {clientId, clientSecret} = req.body;
    const {username, password} = req.body;
    let testAuth = false;

    if (clientId != null && clientSecret != null) {
        testAuth = clientId === "test2@test.fr" && clientSecret === "test";
    }

    if (username != null && password != null) {
        testAuth = username === "test2@test.fr" && password === "test";
    }

    if (testAuth) {
        createJWT({clientId}).then((token) => {
            res.json({
                "token": token,
                "expires_in": 2592000,
                "token_type": "Bearer",
            })
        });
    } else {
        res.sendStatus(401);
    }

    // User.findOne({
    //     where: {"username": username}
    // })
    //     .then((user) => {
    //         user = user.dataValues;
    //
    //         bcrypt.compare(password, u.password, (err, verif) => {
    //             verif === true ? createJWT({u.username}).then((token) => res.json({token})) : res.sendStatus(401);
    //         });
    //     })
    // ;
});

module.exports = router;
