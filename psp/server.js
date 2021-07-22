const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/", function (req, res) {
    setTimeout(() => {
        fetch('http://server:3000/transactions/confirm-payment', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
    }, 10000);

    res.sendStatus(202);
});

app.listen(process.env.PORT || 4000, () => console.log("server listening"));
