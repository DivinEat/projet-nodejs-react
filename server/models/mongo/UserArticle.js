const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const UserArticleSchema = new Schema({
  _id: Number,
  firstname: String,
  lastname: String,
  username: String,
  createdAt: Date,
  Articles: Array,
});

const UserArticle = conn.model("UserArticle", UserArticleSchema);

module.exports = UserArticle;
