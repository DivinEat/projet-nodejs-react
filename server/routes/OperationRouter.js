const {Router} = require("express");
const {Operation} = require("../models/sequelize");
const {prettifyValidationErrors} = require("../lib/utils");

const router = Router();

router.get("/", (request, response) => {
    Operation.findAll({
        where: {transactionId: request.query.transactionId},
    })
        .then((data) => {
            return response ? response.json(data) : null;
        })
        .catch((e) => {
            console.log(e);
            response.sendStatus(500)
        });

});

router.post("/", (req, res) => {
    new Operation(req.body)
        .save()
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            if (e.name === "SequelizeValidationError") {
                console.error(e);
                res.status(400).json(prettifyValidationErrors(e.errors));
            } else {
                res.sendStatus(500);
            }
        });
});

router.get("/:id", (request, response) => {
    const {id} = request.params;
    Operation.findByPk(id)
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});

module.exports = router;
