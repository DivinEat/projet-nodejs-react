const {Schema} = require("mongoose");
const conn = require("../../lib/mongo");

const OperationSchema = new Schema({
    amount: String,
    type: String,
    transactionId: Number,
});

const Operation = conn.model("Operation", OperationSchema);

module.exports = Operation;
