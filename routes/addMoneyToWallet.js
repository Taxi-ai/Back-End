const addMoneyToWallet = require("../controllers/addMoneyToWallet");

const express = require("express");
const router = express.Router();

router.post("/", addMoneyToWallet.add);

module.exports = router;
