const addUserCreditCard = require("../controllers/addUserCreditCard");

const express = require("express");
const router = express.Router();

router.post("/", addUserCreditCard.addCreditCard);

module.exports = router;
