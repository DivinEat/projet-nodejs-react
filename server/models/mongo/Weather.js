const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const WeatherSchema = new Schema({
  datetime: { type: String },
  tempmax: Number,
  tempmin: { type: Number, min: -100 },
  description: String,
});

const Weather = conn.model("Weather", WeatherSchema);

module.exports = Weather;
