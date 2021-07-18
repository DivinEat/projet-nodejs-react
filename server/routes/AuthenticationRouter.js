const {Router} = require("express");
const createJWT = require("../lib/security").createJWT;

const router = Router();

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    // get User
    if (username === "test2@test.fr" && password === "test") {
        createJWT({username}).then((token) => res.json({token}));
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
