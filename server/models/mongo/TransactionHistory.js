const {Schema} = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionHistorySchema = new Schema({
    id: Number,
    initialStatus: String,
    newStatus: String,
    transactionId: Number,
});

const TransactionHistory = conn.model("TransactionHistory", TransactionHistorySchema);

module.exports = TransactionHistory;
