const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", adminController.getAllAdmins);

router.post("/", adminController.createAdmin);

router.put("/:_id", adminController.updateAdmin);

router.delete("/:_id", adminController.deleteAdmin);

router.get("/:_id", adminController.getAdmin);

module.exports = router;
