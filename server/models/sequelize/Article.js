const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const conn = require("../../lib/sequelize");

class Article extends Model {}

Article.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    sequelize: conn,
    modelName: "Article",
  }
);

// One To One
//Article.belongsTo(User);
//User.hasOne(Article);

// One To Many
Article.belongsTo(User, { as: "author" });
User.hasMany(Article, { foreignKey: "authorId" });

// Many To Many
//Article.belongsToMany(User, {as: "coauthors", through: "ArticleUser"});
//User.hasMany(Article, {as: "myArticles", through: "ArticleUser"});

module.exports = Article;
