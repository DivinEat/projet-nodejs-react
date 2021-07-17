const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Transaction = require("./Transaction");

class TransactionHistory extends Model {}

TransactionHistory.init(
    {
        initialStatus: DataTypes.STRING,
        newStatus: DataTypes.STRING,
    },
    {
        sequelize: conn,
        modelName: "TransactionHistory",
    }
);

TransactionHistory.belongsTo(Transaction, { as: "transaction" });
Transaction.hasMany(TransactionHistory, { foreignKey: "transactionId" });

module.exports = TransactionHistory;
