const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Transaction = require("./Transaction");

class Operation extends Model {}

Operation.init(
    {
        consumer: DataTypes.STRING,
    },
    {
        sequelize: conn,
        modelName: "Operation",
    }
);

Operation.belongsTo(Transaction, { as: "transaction" });

module.exports = Operation;
