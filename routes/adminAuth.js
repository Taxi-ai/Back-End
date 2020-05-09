const authController = require("../controllers/adminAuth");

const express = require("express");
const router = express.Router();

router.post("/", authController.authAdmin);

module.exports = router;
