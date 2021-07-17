const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Transaction = require("./Transaction");

class Operation extends Model {}

Operation.init(
    {
        amount: DataTypes.STRING,
        type: DataTypes.STRING,
    },
    {
        sequelize: conn,
        modelName: "Operation",
    }
);

Operation.belongsTo(Transaction, { as: "transaction" });
Transaction.hasMany(Operation, { foreignKey: "transactionId" });

module.exports = Operation;
