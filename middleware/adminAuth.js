const { Admin } = require("../models/admin");
const jwt = require("jsonwebtoken");
const config = require("config");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No Token Provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.admin = decoded;
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(401).send("Not Authorized");
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
