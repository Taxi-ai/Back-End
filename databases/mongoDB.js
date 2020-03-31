const mongoose = require("mongoose");
const config = require("config");

exports.connectMongoDB = async () => {
  const db = config.get("db");
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(`Cannot connect to ${db}...`, err));
};
