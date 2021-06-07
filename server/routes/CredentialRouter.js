const { Router } = require("express");
const { Credential } = require("../models/sequelize");
const { prettifyValidationErrors } = require("../lib/utils");

const router = Router();

router.get("/", (request, response) => {
  Credential.findAll({ where: request.query })
    .then((data) => response.json(data))
    .catch((e) => response.sendStatus(500));
});

router.post("/", (req, res) => {
  new Credential(req.body)
    .save()
    .then((data) => res.status(201).json(data))
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
  const { id } = request.params;
  Credential.findByPk(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.json(data)
    )
    .catch((e) => response.sendStatus(500));
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Credential.destroy({ where: { id } })
    .then((data) =>
      data === 0 ? response.sendStatus(404) : response.sendStatus(204)
    )
    .catch((e) => response.sendStatus(500));
});

module.exports = router;
