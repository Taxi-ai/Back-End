const cancelUserPackage = require("../controllers/cancelUserPackage");

const express = require("express");
const router = express.Router();

router.post("/", cancelUserPackage.cancelPackage);

module.exports = router;
