const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Operation = require("./Operation");

class Transaction extends Model {}

Transaction.init(
    {
        consumer: DataTypes.STRING,
        shippingAddress: DataTypes.STRING,
        billingAddress: DataTypes.STRING,
        cart: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        currency: DataTypes.STRING,
        status: DataTypes.STRING, // INIT, CANC, WAIT, DONE
    },
    {
        sequelize: conn,
        modelName: "Transaction",
    }
);

// Transaction.belongsToMany(Operation, { as: "operations" });

module.exports = Transaction;
