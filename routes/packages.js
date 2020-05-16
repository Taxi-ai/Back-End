const packageController = require("../controllers/package");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", packageController.getAllPackages);

router.post("/", packageController.createPackage);

router.put("/:_id", packageController.updatePackage);

router.delete("/:_id", packageController.deletePackage);

router.get("/:_id", packageController.getPackage);

module.exports = router;
