const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Article = require("./Article");

class Tag extends Model {}

Tag.init(
  {
    title: DataTypes.STRING,
  },
  {
    sequelize: conn,
    modelName: "Tag",
  }
);

// Many To Many
Tag.belongsToMany(Article, { as: "articles", through: "ArticleTag" });
Article.belongsToMany(Tag, { as: "tags", through: "ArticleTag" });

module.exports = Tag;
