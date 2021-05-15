const { Router } = require("express");
const Weather = require("../models/mongo/Weather");
const { prettifyValidationErrors } = require("../lib/utils");
const router = Router();

router.get("/", (request, response) => {
  Weather.find(request.query)
    .then((data) => response.json(data))
    .catch((e) => response.sendStatus(500));
});
router.post("/", (req, res) => {
  new Weather(req.body)
    .save()
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(e.errors));
      } else {
        res.sendStatus(500);
      }
    });
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  Weather.findById(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.json(data)
    )
    .catch((e) => response.sendStatus(500));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  Weather.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((data) =>
      data !== null ? res.status(200).json(data) : res.sendStatus(404)
    )
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(e.errors));
      } else {
        res.sendStatus(500);
      }
    });
});
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Weather.findByIdAndDelete(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.sendStatus(204)
    )
    .catch((e) => response.sendStatus(500));
});

module.exports = router;
