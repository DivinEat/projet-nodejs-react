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

            sendRequestToPsp(data).then((res) => {
                res != null ? res.json : null
            });
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
    Transaction.findByPk(req.body.transactionId)
        .then((previousDatas) => {
            Transaction.update({status: 'DONE'}, {
                where: {id: req.body.transactionId},
                returning: true,
                individualHooks: true,
            })
                .then(([, [transaction]]) => {
                    console.log("transaction")
                    console.log(transaction)
                    updateTransactionToMongo(transaction.dataValues);

                    new TransactionHistory({
                        initialStatus: previousDatas.dataValues.status,
                        newStatus: transaction.dataValues.status,
                        transactionId: transaction.dataValues.id,
                    }).save().then((transactionHistory) => {
                        saveTransactionHistoryToMongo(transactionHistory.dataValues);
                    });
                })
        })
    ;

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
                    if (transaction == null)
                        return res.sendStatus(404);

                    updateTransactionToMongo(transaction.dataValues);

                    new TransactionHistory({
                        initialStatus: previousDatas.dataValues.status,
                        newStatus: transaction.dataValues.status,
                        transactionId: transaction.dataValues.id,
                    }).save().then((transactionHistory) => {
                        saveTransactionHistoryToMongo(transactionHistory.dataValues);
                    });


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

router.get("/get/:id", (request, response) => {
    const {id} = request.params;
    console.log("id")
    console.log(id)
    Transaction.findByPk(id)
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});

router.use(verifyAuthorization);

router.get("/merchant", (request, response) => {
    console.log("request.merchant.id");
    console.log(request.merchant.id);
    TransactionMongo.find({merchantId: request.merchant.id}).exec()
        .then(
            (data) => {
                console.log("data")
                console.log(data)
                data === null ? response.sendStatus(404) : response.json(data)
            }
        )
        .catch((e) => response.sendStatus(500));
});

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
            saveTransactionToMongo(transaction.dataValues);

            new TransactionHistory({
                initialStatus: null,
                newStatus: transaction.dataValues.status,
                transactionId: transaction.dataValues.id,
            }).save().then((transactionHistory) => {
                saveTransactionHistoryToMongo(transactionHistory.dataValues);
            });

            new Operation({
                amount: transaction.dataValues.amount,
                type: 'CAPTURE',
                transactionId: transaction.dataValues.id
            }).save().then((operation) => {
                saveOperationToMongo(operation.dataValues);
            });

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

router.post("/merchant-search", (request, response) => {
    const query = request.body && request.body.query
        ? {merchantId: request.merchant.id, $text: {$search: request.body.query, $caseSensitive: false}}
        : {merchantId: request.merchant.id}
    console.log("query")
    console.log(query)
    TransactionMongo.find(query).exec()
        .then(
            (data) => {
                console.log("data");
                console.log(data);
                data === null ? response.sendStatus(404) : response.json(data)
            }
        )
        .catch
        ((e) => response.sendStatus(500));
});

router.delete("/:id", (request, response) => {
    const {id} = request.params;
    Transaction.destroy({where: {id}})
        .then((data) => {
            if (data === 0)
                response.sendStatus(404)
            deleteTransactionFromMongo(id);
            response.sendStatus(204);
        })
        .catch((e) => response.sendStatus(500));
});

const saveTransactionToMongo = (data) => {
    return new TransactionMongo({
        id: data.id,
        consumer: data.consumer,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        cart: data.cart,
        totalPrice: data.totalPrice,
        currency: data.currency,
        merchantId: data.merchantId,
        status: data.status,
    }).save();
}

const saveOperationToMongo = (data) => {
    return new OperationMongo({
        id: data.id,
        amount: data.amount,
        type: 'CAPTURE',
        transactionId: data.transactionId
    }).save();
};

const saveTransactionHistoryToMongo = (data) => {
    return new TransactionHistoryMongo({
        id: data.id,
        initialStatus: data.initialStatus,
        newStatus: data.newStatus,
        transactionId: data.transactionId,
    }).save();
};

const updateTransactionToMongo = (data) => {
    TransactionMongo.findOne({id: data.id}, function (err, transaction) {
        transaction.save();
        TransactionMongo.replaceOne(
            {id: data.id},
            {
                id: data.id,
                consumer: data.consumer,
                shippingAddress: data.shippingAddress,
                billingAddress: data.billingAddress,
                cart: data.cart,
                totalPrice: data.totalPrice,
                currency: data.currency,
                merchantId: data.merchantId,
                status: data.status
            }
        );
    });
};

const deleteTransactionFromMongo = (id) => {
    TransactionMongo.findOne({id: id}, function (err, transaction) {
        transaction.delete();
    });
};


module.exports = router;
