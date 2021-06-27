const { Router } = require("express");
const router = Router();

router
    .get("/", (req, res) => {
        res.render("payment", {
            items: [
                { title: "savon", quantity: 4 },
                { title: "sel", quantity: 4 },
            ],
        });
    })
    .post("/", (req, res) => {
        console.log(req.body);
        res.render("payment", {
            items: [
                { title: "savon", quantity: 4 },
                { title: "sel", quantity: 4 },
            ],
            success: true,
        });
    });

module.exports = router;
