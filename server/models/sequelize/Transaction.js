const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");

class Transaction extends Model {}

Transaction.init(
    {
        client: DataTypes.INTEGER,
        facturation: DataTypes.STRING,
        livraison: DataTypes.STRING,
        panier: DataTypes.STRING,
        montant: DataTypes.STRING,
        devise: DataTypes.STRING,
    },
    {
        sequelize: conn,
        modelName: "Transaction",
    }
);

module.exports = Transaction;