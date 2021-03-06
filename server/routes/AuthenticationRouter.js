const {Router} = require("express");
const createJWT = require("../lib/security").createJWT;
const {Credential, Merchant, User} = require("../models/sequelize")
const bcrypt = require('bcryptjs');

const router = Router();

router.post("/login", (req, res) => {
    const {clientId, clientSecret} = req.body;
    const {username, password} = req.body;

    if (clientId != null && clientSecret != null) {
        Credential.findOne({
            where: {
                "clientId": clientId,
                "clientSecret": clientSecret,
            }
        })
            .then((credentials) => {
                if (credentials == null) {
                    res.sendStatus(401);
                    return;
                }

                return Merchant.findOne({
                    where: {
                        "id": credentials.merchantId
                    }
                })
                    .then((merchant) => {
                        if (merchant != null) {
                            return createJWT(null, merchant)
                                .then((token) => {
                                    res.json({
                                        "token": token,
                                        "expires_in": 2592000,
                                        "token_type": "Bearer",
                                    })
                                });
                        }
                        res.sendStatus(401);
                    });
            });
    }

    if (username != null && password != null) {
        User.findOne({
            where: {
                "username": username,
            }
        })
            .then((user) => {
                console.log("here")
                if (user == null) {
                    console.log("here2")

                    res.sendStatus(401);
                    return;
                }

                return bcrypt.compare(password, user.password, (err, verif) => {
                        if (verif === true) {
                            Merchant.findOne({
                                where: {
                                    "id": user.MerchantId,
                                    "status": true
                                }
                            })
                                .then((merchant) => {
                                    console.log("here1")

                                    if (merchant == null && user.role !== 'ADMIN') {
                                        console.log("here2")
                                        res.sendStatus(401);
                                        return;
                                    }

                                    return createJWT(user, merchant)
                                        .then((token) => {
                                                res.json({
                                                    "token": {
                                                        "value": token,
                                                        "expires_in": 2592000,
                                                        "token_type": "Bearer",
                                                    },
                                                    "userRole": user.role
                                                })
                                            }
                                        );
                                });
                        }
                    }
                );
            })
            .catch((e) => console.log(e));
    }
})
;

module.exports = router;
