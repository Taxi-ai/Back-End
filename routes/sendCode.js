const sendCode = require("../controllers/sendCode");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", sendCode.send);

router.get("/", sendCode.receive);

module.exports = router;
