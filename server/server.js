const express = require("express");
const UserRouter = require("./routes/UserRouter");
const ArticleRouter = require("./routes/ArticleRouter");
const WeatherRouter = require("./routes/WeatherRouter");
const PaymentRouter = require("./routes/PaymentRouter");
const MerchantRouter = require("./routes/MerchantRouter");
const CredentialRouter = require("./routes/CredentialRouter");
const TransactionRouter = require("./routes/TransactionRouter");
const TransactionHistoryRouter = require("./routes/TransactionHistoryRouter");
const OperationRouter = require("./routes/OperationRouter");
const AuthenticationRouter = require("./routes/AuthenticationRouter");
const verifyAuthorization = require("./middlewares/verifyAuthorization");
const mustacheExpress = require("mustache-express");
const cors = require("cors");

const app = express();
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// User sequelize
app.use("", AuthenticationRouter);
app.use("/merchants", MerchantRouter);
app.use("/transactions", TransactionRouter);
app.use(verifyAuthorization);
app.use("/users", UserRouter);
app.use("/articles", ArticleRouter);
app.use("/weathers", WeatherRouter);
app.use("/payment", PaymentRouter);
app.use("/credentials", CredentialRouter);
app.use("/operations", OperationRouter);
app.use("/transaction-histories", TransactionHistoryRouter);

app.listen(process.env.PORT || 3000, () => console.log("server listening"));
