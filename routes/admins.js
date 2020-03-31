const adminController = require("../controllers/admin");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

// Getting all admins
/*.....[Tested Successfully].......*/
router.get("/", adminController.getAllAdmins);

// Creating a new admin
/*.....[Tested Successfully].......*/
router.post("/", auth, adminController.createAdmin);

// Updating admin with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", auth, adminController.updateAdmin);

/*
// Deleting admin with required ID
*/

// Getting admin with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", auth, adminController.getAdmin);

module.exports = router;
