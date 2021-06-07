const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");

class Merchant extends Model {}

Merchant.init(
  {
    societyName: DataTypes.STRING,
    kbis: DataTypes.STRING,
    confirmUrl: DataTypes.STRING,
    cancelUrl: DataTypes.STRING,
    currency: DataTypes.STRING,
    clientToken: DataTypes.STRING,
    clientSecret: DataTypes.STRING
  },
  {
    sequelize: conn,
    modelName: "Merchant"
  }
);

module.exports = Merchant;