const companyController = require("../controllers/company");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Getting all companies
/*.....[Tested Successfully].......*/
router.get("/", adminAuth, companyController.getAllCompanies);

// Creating new company
/*.....[Tested Successfully].......*/
router.post("/", adminAuth, companyController.createCompany);

// Updating company with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", adminAuth, companyController.updateCompany);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", adminAuth, companyController.deleteCompany);

// Getting company with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", adminAuth, companyController.getCompany);

module.exports = router;
