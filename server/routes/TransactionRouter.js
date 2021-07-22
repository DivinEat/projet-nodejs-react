const {Router} = require("express");
const {Transaction, Merchant} = require("../models/sequelize");
const {prettifyValidationErrors} = require("../lib/utils");
const http = require("http");
const TransactionHistory = require("../models/sequelize/TransactionHistory");
const Operation = require("../models/sequelize/Operation");
const TransactionMongo = require("../models/mongo/Transaction");
const OperationMongo = require("../models/mongo/Operation");
const TransactionHistoryMongo = require("../models/mongo/TransactionHistory");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

const router = Router();

router.post("/client-confirm-payment/:id", (req, res) => {
    const {id} = req.params;

    Transaction.findOne({where: {id: id}}).then((transaction) => {
        const data = JSON.stringify({
            paymentInfo: req.body,
            price: transaction.dataValues.totalPrice,
            currency: transaction.dataValues.currency
        });

        confirmPayment(data).then((res) => console.log('allo'));
    });

    // const options = {
    //     hostname: "psp",
    //     port: 4000,
    //     path: "/",
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": Buffer.byteLength(data),
    //     },
    // };
    //
    // const request = http.request(options, (res) => {
    //     res.setEncoding("utf8");
    //     res.on("data", (chunk) => {
    //         console.log(`BODY: ${chunk}`);
    //     });
    //     res.on("end", () => {
    //         console.log("No more data in response.");
    //     });
    // });
    //
    // request.on("error", (e) => {
    //     console.error(`problem with request: ${e.message}`);
    // });
    //
    // // Write data to request body
    // request.write(data);
    // request.end();
    //
    // // confirmPayment(JSON.stringify(data));
    //
    // // const merchant = Merchant.findOne({ where: { secretKey: data.secretKey } });
    //
    // res.redirect("https://google.com");
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

    // token
    // req.body.transaction.merchantId = "";

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
router.get("/:id", (request, response) => {
    const {id} = request.params;
    Transaction.findByPk(id)
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});
router.put("/:id", (req, res) => {
    const {id} = req.params;
    Transaction.update(req.body, {
        where: {id},
        returning: true,
        individualHooks: true,
    })
        .then(([, [data]]) => (data !== undefined ? res.status(200).json(data) : res.sendStatus(404)))
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

async function confirmPayment(data) {
    const options = {
        hostname: "localhost",
        port: 4000,
        path: "/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
        },
    };

    const {http} = require("http");

    const req = http.request(options, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d);
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

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
