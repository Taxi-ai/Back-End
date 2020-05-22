const issues = require("./routes/issues");
const admins = require("./routes/admins");
const users = require("./routes/users");
const home = require("./routes/home");
const help = require("./routes/help");
const cars = require("./routes/cars");
const companies = require("./routes/companies");
const companiesHistory = require("./routes/companiesHistory");
const packages = require("./routes/packages");
const validateEmail = require("./routes/validateEmail");
const signInUser = require("./routes/signInUser");
const sendCode = require("./routes/sendCode");
const notifications = require("./routes/notification");
const offers = require("./routes/offers");
const faqs = require("./routes/faq");
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
// app.use(express.static(path.join(__dirname, "")));
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("views", "./public");
app.set("view engine", "ejs");

app.use("/", home);
app.use("/help", help);

app.use("/api/admins", admins);
app.use("/api/users", users);
app.use("/api/cars", cars);
app.use("/api/companies", companies);
app.use("/api/companiesHistory", companiesHistory);
app.use("/api/issues", issues);
app.use("/api/packages", packages);
app.use("/api/validateEmail", validateEmail);
app.use("/api/signInUser", signInUser);
app.use("/api/sendCode", sendCode);
app.use("/api/notifications", notifications);
app.use("/api/offers", offers);
app.use("/api/faqs", faqs);
app.use("/api/adminAuth", adminAuth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

var io = require("socket.io").listen(server);
var customerServices = require("./routes/customerService")(io);
var trackCarLocations = require("./routes/trackCarLocation")(io);

app.use("/api/customerServices", customerServices);
app.use("/api/trackCarLocations", trackCarLocations);

// const io = require("./socket").init(server);
// io.on("connection", (socket) => {
//   console.log("client connected");
// });
