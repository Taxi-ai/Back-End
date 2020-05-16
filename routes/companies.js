const companyController = require("../controllers/company");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", companyController.getAllCompanies);

router.post("/", companyController.createCompany);

router.put("/:_id", companyController.updateCompany);

router.delete("/:_id", companyController.deleteCompany);

router.get("/:_id", companyController.getCompany);

module.exports = router;
