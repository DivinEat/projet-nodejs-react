const { Router } = require("express");
const { Transaction, Merchant } = require("../models/sequelize");
const { prettifyValidationErrors } = require("../lib/utils");
const http = require("http");
const TransactionHistory = require("../models/sequelize/TransactionHistory");
const { route } = require("./ArticleRouter");

const router = Router();

router.get("/", (request, response) => {
    Transaction.findAll({
        where: request.query,
    })
        .then((data) => response.json(data))
        .catch((e) => response.sendStatus(500));
});
router.post("/", (req, res) => {
    req.body.transaction.status = "INIT";

    new Transaction(req.body.transaction)
        .save()
        .then((data) => {
            new TransactionHistory({
                initialStatus: null,
                newStatus: data.dataValues.status,
                transaction: data.transaction,
            }).save();

            res.status(201).json({
                transaction: data,
                payment_url: `http://localhost:3001/transactions/client-confirm-payment/${data.id}`,
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
    const { id } = request.params;
    Transaction.findByPk(id)
        .then((data) => (data === null ? response.sendStatus(404) : response.json(data)))
        .catch((e) => response.sendStatus(500));
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    Transaction.update(req.body, {
        where: { id },
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
    const { id } = request.params;
    Transaction.destroy({ where: { id } })
        .then((data) => (data === 0 ? response.sendStatus(404) : response.sendStatus(204)))
        .catch((e) => response.sendStatus(500));
});

router.get("/client-confirm-payment/:transId", (req, res) => {
    const { transId } = req.params;
    Transaction.findByPk(transId).then((data) => {
        res.render("confirm-payment", {
            transaction: data.dataValues,
        });
    });
});

router.post("/client-confirm-payment/:transId", (req, res) => {
    const data = JSON.stringify(req.body);

    const postData = JSON.stringify({
        msg: "Hello World!",
    });

    const options = {
        hostname: "psp",
        port: 4000,
        path: "/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data),
        },
    };

    const request = http.request(options, (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on("end", () => {
            console.log("No more data in response.");
        });
    });

    request.on("error", (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    request.write(data);
    request.end();

    // confirmPayment(JSON.stringify(data));

    // const merchant = Merchant.findOne({ where: { secretKey: data.secretKey } });

    res.redirect("https://google.com");
});

router.post("/psp-confirm-payment", (req, res) => {
    const data = req.body;
    console.log("hey");
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

    const { http } = require("http");

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

module.exports = router;
