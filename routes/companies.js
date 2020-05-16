const companyController = require("../controllers/company");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", adminAuth, companyController.getAllCompanies);

router.post("/", adminAuth, companyController.createCompany);

router.put("/:_id", adminAuth, companyController.updateCompany);

router.delete("/:_id", adminAuth, companyController.deleteCompany);

router.get("/:_id", adminAuth, companyController.getCompany);

module.exports = router;
