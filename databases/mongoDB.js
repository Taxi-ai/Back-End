const mongoose = require("mongoose");
const config = require("config");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/barq";
exports.connectMongoDB = async () => {
  const db = config.get("db");
  mongoose
    .connect(CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.error(`Cannot connect to ${db}...`, err));
};
