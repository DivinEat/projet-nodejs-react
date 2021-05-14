const express = require("express");
const Weather = require("./models/mongo/Weather");

const app = express();

app.use(express.json());

const prettifyValidationErrors = (errors) =>
  Object.keys(errors).reduce((acc, err) => {
    acc[err] = errors[err].message;
    return acc;
  }, {});

app.get("/weathers", (request, response) => {
  Weather.find(request.query)
    .then((data) => response.json(data))
    .catch((e) => response.sendStatus(500));
});
app.post("/weathers", (req, res) => {
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
app.get("/weathers/:id", (request, response) => {
  const { id } = request.params;
  Weather.findById(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.json(data)
    )
    .catch((e) => response.sendStatus(500));
});
app.put("/weathers/:id", (req, res) => {
  const { id } = req.params;
  Weather.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((data) => res.status(200).json(data))
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(e.errors));
      } else {
        res.sendStatus(500);
      }
    });
});
app.delete("/weathers/:id", (request, response) => {
  const { id } = request.params;
  Weather.findByIdAndDelete(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.sendStatus(204)
    )
    .catch((e) => response.sendStatus(500));
});

app.listen(process.env.PORT || 3000, () => console.log("server listening"));
