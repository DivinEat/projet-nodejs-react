const { Model, DataTypes } = require("sequelize");
const Merchant = require("./Merchant");
const conn = require("../../lib/sequelize");

class Credential extends Model {}

Credential.init(
    {
        clientToken: DataTypes.STRING,
        clientSecret: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    },
    {
        sequelize: conn,
        modelName: "Credential",
    }
);

Credential.belongsTo(Merchant, { as: "merchant" });
Merchant.hasMany(Credential, { foreignKey: "merchantId" });

module.exports = Credential;
