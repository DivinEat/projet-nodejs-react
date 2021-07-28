const {Schema} = require("mongoose");
const conn = require("../../lib/mongo");

const UserSchema = new Schema({
    _id: Number,
    firstname: String,
    lastname: String,
    username: String,
    createdAt: Date,
    Articles: Array,
});

const User = conn.model("User", UserSchema);

module.exports = User;
