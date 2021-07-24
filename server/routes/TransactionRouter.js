const {Router} = require("express");
const {Transaction} = require("../models/sequelize");
const {prettifyValidationErrors} = require("../lib/utils");
const TransactionHistory = require("../models/sequelize/TransactionHistory");
const Operation = require("../models/sequelize/Operation");
const TransactionMongo = require("../models/mongo/Transaction");
const OperationMongo = require("../models/mongo/Operation");
const TransactionHistoryMongo = require("../models/mongo/TransactionHistory");
const verifyAuthorization = require("../middlewares/verifyAuthorization");
const fetch = require("node-fetch");

const router = Router();

router.post("/client-confirm-payment/:id", (req, res) => {
    const {id} = req.params;

    Transaction.findOne({where: {id: id}})
        .then((transaction) => {
            const data = JSON.stringify({
                paymentInfo: req.body,
                price: transaction.dataValues.totalPrice,
                currency: transaction.dataValues.currency,
                transactionId: id
            });

            sendRequestToPsp(data).then((res) => console.log('allo'));
        })
        .catch((e) => {
            res.sendStatus(500);
        });
});

function sendRequestToPsp(data) {
    return fetch('http://psp:4000/', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: data
    });
}

router.post("/confirm-payment", (req, res) => {
    Transaction.update({status: 'DONE'}, {
        where: {id: req.body.transactionId},
        returning: true,
        individualHooks: true,
    })
});

router.use(verifyAuthorization);

router.get("/", (request, response) => {
    Transaction.findAll({
        where: request.query,
    })
        .then((data) => response.json(data))
        .catch((e) => response.sendStatus(500));
});

router.post("/", (req, res) => {
    req.body.transaction.status = "INIT";
    req.body.transaction.merchantId = req.merchant.id;

    new Transaction(req.body.transaction)
        .save()
        .then((transaction) => {
            new TransactionHistory({
                initialStatus: null,
                newStatus: transaction.dataValues.status,
                transactionId: transaction.dataValues.id,
            }).save();

            new Operation({
                amount: transaction.dataValues.amount,
                type: 'CAPTURE',
                transactionId: transaction.dataValues.id
            }).save();

            saveToMongo(transaction.dataValues);

            res.status(201).json({
                transaction: transaction.dataValues,
                payment_url: `http://localhost:3002/transactions/client-confirm-payment/${transaction.dataValues.id}`,
            });
        })
        .catch((e) => {
            if (e.name === "SequelizeValidationError") {
                console.error(e);
                res.status(400).json(prettifyValidationErrors(e.errors));
            } else {
                console.error(e);
                res.sendStatus(500);
            }
        });
});
router.get("/merchant", (request, response) => {
    Transaction.findAll({
        where: {merchantId: request.merchant.id}
    })
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});
router.get("/:id", (request, response) => {
    const {id} = request.params;
    Transaction.findByPk(id)
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});
router.put("/:id", (req, res) => {
    const {id} = req.params;
    
    Transaction.findByPk(id)
        .then((previousDatas) => {
            Transaction.update(req.body, {
                where: {id},
                returning: true,
                individualHooks: true,
            })
                .then(([, [transaction]]) => {
                    if (transaction == null) {
                        return res.sendStatus(404);
                    }

                    new TransactionHistory({
                        initialStatus: previousDatas.dataValues.status,
                        newStatus: transaction.dataValues.status,
                        transactionId: transaction.dataValues.id,
                    }).save();

                    return res.status(200).json(transaction);
                })
        })

        .catch((e) => {
            if (e.name === "SequelizeValidationError") {
                res.status(400).json(prettifyValidationErrors(e.errors));
            } else {
                res.sendStatus(500);
            }
        });
});

router.delete("/:id", (request, response) => {
    const {id} = request.params;
    Transaction.destroy({where: {id}})
        .then((data) => (data === 0 ? response.sendStatus(404) : response.sendStatus(204)))
        .catch((e) => response.sendStatus(500));
});

const saveToMongo = (transaction) => {
    new TransactionMongo({
        consumer: transaction.consumer,
        shippingAddress: transaction.shippingAddress,
        billingAddress: transaction.billingAddress,
        cart: transaction.cart,
        totalPrice: transaction.totalPrice,
        currency: transaction.currency,
        merchantId: transaction.merchantId,
        status: transaction.status
    }).save();

    new TransactionHistoryMongo({
        initialStatus: null,
        newStatus: transaction.status,
        transactionId: transaction.transactionId,
    }).save();

    new OperationMongo({
        amount: transaction.amount,
        type: 'CAPTURE',
        transactionId: transaction.id,
    }).save();
};

module.exports = router;
