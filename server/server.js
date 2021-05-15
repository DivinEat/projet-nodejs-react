const express = require("express");
const UserRouter = require("./routes/UserRouter");
const ArticleRouter = require("./routes/ArticleRouter");
const WeatherRouter = require("./routes/WeatherRouter");
const PaymentRouter = require("./routes/PaymentRouter");
const mustacheExpress = require("mustache-express");

const app = express();
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded());

// User sequelize
app.use("/users", UserRouter);
app.use("/articles", ArticleRouter);
app.use("/weathers", WeatherRouter);
app.use("/payment", PaymentRouter);

app.listen(process.env.PORT || 3000, () => console.log("server listening"));
