const {Model, DataTypes} = require("sequelize");
const conn = require("../../lib/sequelize");

class Merchant extends Model {
}

Merchant.init(
    {
        societyName: DataTypes.STRING,
        kbis: DataTypes.STRING,
        confirmUrl: DataTypes.STRING,
        cancelUrl: DataTypes.STRING,
        transactionSuccessUrl: DataTypes.STRING,
        currency: DataTypes.STRING,
        status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    },
    {
        sequelize: conn,
        modelName: "Merchant",
    }
);

module.exports = Merchant;
