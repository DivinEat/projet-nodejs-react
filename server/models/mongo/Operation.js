const {Schema} = require("mongoose");
const conn = require("../../lib/mongo");

const OperationSchema = new Schema({
    id: Number,
    amount: String,
    type: String,
    transactionId: Number,
});

const Operation = conn.model("Operation", OperationSchema);

module.exports = Operation;
