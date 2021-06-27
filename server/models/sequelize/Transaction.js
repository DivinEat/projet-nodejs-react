const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");

class Transaction extends Model {}

Transaction.init(
    {
        consumer: DataTypes.STRING,
        shippingAddress: DataTypes.STRING,
        billingAddress: DataTypes.STRING,
        cart: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        currency: DataTypes.STRING,
    },
    {
        sequelize: conn,
        modelName: "Transaction",
    }
);

module.exports = Transaction;
