const {Router} = require("express");
const {Merchant, Credential, User} = require("../models/sequelize");
const {prettifyValidationErrors, generateCredentials} = require("../lib/utils");
const {sendMail} = require("../lib/mail");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

const router = Router();

router.post("/", (req, res) => {
    const data = req.body;
    const merchant = data.merchant;
    const user = data.user;

    Merchant.create(merchant)
        .then((merchant) => {
            user.MerchantId = merchant.id;

            User.create(user)
                .then((user) => {
                    const email = user.dataValues.username;
                    sendMail(email, "Welcome to ServerAPI",
                        'Your account is awaiting validation by an Admin.');

                    return res.status(201).json(merchant);
                })
                .catch((e) => {
                    if (e.name === "SequelizeValidationError") {
                        console.error(e);
                        res.status(400).json(prettifyValidationErrors(e.errors));
                    } else {
                        console.log(e);
                        res.sendStatus(500);
                    }
                });
        })
        .catch((e) => {
            if (e.name === "SequelizeValidationError") {
                console.error(e);
                res.status(400).json(prettifyValidationErrors(e.errors));
            } else {
                console.log(e);
                res.sendStatus(500);
            }
        });
});

router.get("/:id", (request, response) => {
    const {id} = request.params;
    console.log(id);
    Merchant.findByPk(id)
        .then((data) =>
            data === null ? response.sendStatus(404) : response.json(data)
        )
        .catch((e) => response.sendStatus(500));
});

router.use(verifyAuthorization);

router.get("/", (request, response) => {
    Merchant.findAll({where: request.query})
        .then((data) => response.json(data))
        .catch((e) => response.sendStatus(500));
});

router.put("/:id", (req, res) => {
    const {id} = req.params;

    Merchant.update(req.body, {
        where: {id},
        returning: true,
        individualHooks: true,
    })
        .then(([, [data]]) => {
                if (data.dataValues.status) {
                    User.findOne({where: {MerchantId: id}}).then((user) => {
                        const email = user.dataValues.username;

                        Credential.destroy({where: {merchantId: id}});

                        const credentials = generateCredentials(id);

                        new Credential(credentials).save().then((credential) => {
                            sendMail(email, "Credentials", `clientId : ${credential.dataValues.clientId}\nclientSecret : ${credential.dataValues.clientSecret}`);
                        });
                    });
                }

                return data !== undefined ? res.status(200).json(data) : res.sendStatus(404)
            }
        )
        .catch((e) => {
            if (e.name === "SequelizeValidationError") {
                res.status(400).json(prettifyValidationErrors(e.errors));
            } else {
                res.sendStatus(500);
            }
        });
});

router.delete("/:id", (request, response) => {
    const {id} = request.params;
    Merchant.destroy({where: {id}})
        .then((data) =>
            data === 0 ? response.sendStatus(404) : response.sendStatus(204)
        )
        .catch((e) => response.sendStatus(500));
});

module.exports = router;
