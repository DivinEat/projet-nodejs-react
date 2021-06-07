const express = require("express");
const http = require('http');
const app = express();

app.use(express.json());

app.post('/', function (req, res) {
    const postData = JSON.stringify(req.body);
    setTimeout(() => http.post(process.env.API_URL + '/webhook', {headers: {
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(postData)
        }}).write(postData).end(), 10000);
    res.sendStatus(202);
});

app.listen(process.env.PORT || 4000, () => console.log("server listening"));