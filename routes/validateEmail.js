const validateEmail = require("../controllers/validateEmail");

const express = require("express");
const router = express.Router();

router.post("/", validateEmail.validateUserEmail);

module.exports = router;
