const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const processSomething = callback => {
    setTimeout(callback, 20000);
}

app.post("/hook", (req, res, next) => {
    processSomething(() => {
        const webhookUrl = req.params.url;

        console.log('hook' + webhookUrl);
    });

    res.status(200).send('OK')
});

app.get("/", (req, res) => {
    console.log("allo la terre");
})

app.listen(process.env.PORT || 3005, () => console.log("server listening"));
