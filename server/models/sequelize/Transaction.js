const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Merchant = require("./Merchant");

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

Transaction.belongsTo(Merchant, { as: "merchant" });
Merchant.hasMany(Transaction, { foreignKey: "merchantId" });

module.exports = Transaction;
