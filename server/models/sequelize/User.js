const {Model, DataTypes} = require("sequelize");
const conn = require("../../lib/sequelize");
const bcrypt = require("bcryptjs");
const Merchant = require("./Merchant");


class User extends Model {
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize: conn,
        modelName: "User",
    }
);

const updatePassword = async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
};
User.addHook("beforeCreate", updatePassword);
User.addHook("beforeUpdate", updatePassword);

User.merchant = User.belongsTo(Merchant);
Merchant.hasMany(User);

module.exports = User;
