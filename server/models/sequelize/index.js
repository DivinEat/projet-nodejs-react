const connection = require("../../lib/sequelize");
const User = require("./User");
const Article = require("./Article");
const Tag = require("./Tag");
const Merchant = require("./Merchant");
const Credential = require("./Credential");
const UserArticle = require("../mongo/UserArticle");
const Transaction = require("./Transaction");
const TransactionHistory = require("./TransactionHistory");
const Operation = require("./Operation");

connection.sync({ alter: true }).then((_) => console.log("Database synced"));

const denormalizeUser = (user) => {
    User.findByPk(user.id, {
        include: [{ model: Article, attributes: ["id", "title", "createdAt"] }],
    }).then((data) => {
        const denormalizedUser = data.toJSON();
        denormalizedUser._id = denormalizedUser.id;
        UserArticle.findOneAndReplace({ _id: denormalizedUser.id }, denormalizedUser, { upsert: true, new: true }).then(
            (data) => console.log(`User ${data._id} saved to mongo`)
        );
    });
};

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);

Article.addHook("afterCreate", (article) => denormalizeUser({ id: article.authorId }));
Article.addHook("afterUpdate", (article) => denormalizeUser({ id: article.authorId }));

module.exports = {
    User,
    Article,
    Tag,
    Merchant,
    Credential,
    Transaction,
    TransactionHistory,
    Operation
};
