const helpController = require("../controllers/help");

const express = require("express");
const router = express.Router();

router.get("/", helpController.getHomePage);

module.exports = router;
