const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Getting all admins
/*.....[Tested Successfully].......*/
router.get("/", adminAuth, adminController.getAllAdmins);
// Creating a new admin
/*.....[Tested Successfully].......*/
router.post("/", adminAuth, adminController.createAdmin);
// Updating admin with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", adminAuth, adminController.updateAdmin);
/*
// Deleting admin with required ID
*/
router.delete("/:_id", adminAuth, adminController.deleteAdmin);
// Getting admin with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", adminAuth, adminController.getAdmin);

module.exports = router;
