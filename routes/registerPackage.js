const registerPackageController = require("../controllers/registerPackage");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", registerPackageController.registerUserPackage);

module.exports = router;
