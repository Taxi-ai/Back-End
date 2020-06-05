const mongoose = require("mongoose");
const config = require("config");
//const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/barq";
const CONNECTION_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://MahmoudYoussef:Ap7c9aydvg@cluster0-dblyj.azure.mongodb.net/barq?retryWrites=true&w=majority";
exports.connectMongoDB = async () => {
  const db = config.get("db");
  mongoose
    .connect(CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${CONNECTION_URI}...`))
    .catch((err) => console.error(`Cannot connect to ${db}...`, err));
};
