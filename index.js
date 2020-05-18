const issues = require("./routes/issues");
const admins = require("./routes/admins");
const users = require("./routes/users");
const home = require("./routes/home");
const cars = require("./routes/cars");
const companies = require("./routes/companies");
const companiesHistory = require("./routes/companiesHistory");
const packages = require("./routes/packages");
const registerPackage = require("./routes/registerPackage");
const validateEmail = require("./routes/validateEmail");
const addUserCreditCard = require("./routes/addUserCreditCard");
const signInUser = require("./routes/signInUser");
const cancelUserPackage = require("./routes/cancelUserPackage");
const sendCode = require("./routes/sendCode");
const notifications = require("./routes/notification");
const addMoneyToWallet = require("./routes/addMoneyToWallet");
const adminAuth = require("./routes/adminAuth");

const mongodbDriver = require("./databases/mongoDB");
const dbDriver = require("./databases/dbDriver");
const path = require("path");

const config = require("config");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined...");
}
dbDriver.connectDriver(mongodbDriver.connectMongoDB()); // Connecting to mongoDB driver ...

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, "")));
app.engine("html", require("ejs").renderFile);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home);
app.use("/api/admins", admins);
app.use("/api/users", users);
app.use("/api/cars", cars);
app.use("/api/companies", companies);
app.use("/api/companiesHistory", companiesHistory);
app.use("/api/issues", issues);
app.use("/api/packages", packages);
app.use("/api/registerPackage", registerPackage);
app.use("/api/addUserCreditCard", addUserCreditCard);
app.use("/api/validateEmail", validateEmail);
app.use("/api/signInUser", signInUser);
app.use("/api/cancelUserPackage", cancelUserPackage);
app.use("/api/sendCode", sendCode);
app.use("/api/notifications", notifications);
app.use("/api/addMoneyToWallet", addMoneyToWallet);
app.use("/api/adminAuth", adminAuth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
