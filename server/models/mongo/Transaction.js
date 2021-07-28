const {Schema} = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
    consumer: String,
    shippingAddress: String,
    billingAddress: String,
    cart: String,
    totalPrice: String,
    currency: String,
    merchantId: Number,
    status: String, // INIT, CANC, WAIT, DONE
});

TransactionSchema.index({
    consumer: 'text',
    shippingAddress: 'text',
    billingAddress: 'text',
    cart: 'text',
    totalPrice: 'text',
    currency: 'text',
    status: 'text'
});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;
