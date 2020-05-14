const packageController = require("../controllers/package");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Getting all companies
/*.....[Tested Successfully].......*/
router.get("/", packageController.getAllPackages);

// Creating new company
/*.....[Tested Successfully].......*/
router.post("/", adminAuth, packageController.createPackage);

// Updating company with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", adminAuth, packageController.updatePackage);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", adminAuth, packageController.deletePackage);

// Getting company with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", packageController.getPackage);

module.exports = router;
