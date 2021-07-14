const express = require("express");
const http = require("http");
const app = express();

app.use(express.json());

app.post("/", function (req, res) {
    const postData = JSON.stringify(req.body);
    setTimeout(() => {
        const options = {
            hostname: process.env.API_URL,
            port: 3000,
            path: "/confirm-payment",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
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
        request.write(postData);
        request.end();

        // http.post(process.env.API_URL + "/confirm-payment", {
        //     headers: {
        //         "content-type": "application/json",
        //         "content-length": Buffer.byteLength(postData),
        //     },
        // })
        //     .write(postData)
        //     .end();
    }, 10000);
    res.sendStatus(202);
});

app.listen(process.env.PORT || 4000, () => console.log("server listening"));
