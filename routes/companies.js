const companyController = require("../controllers/company");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

// Getting all companies
/*.....[Tested Successfully].......*/
router.get("/", auth, companyController.getAllCompanies);

// Creating new company
/*.....[Tested Successfully].......*/
router.post("/", auth, companyController.createCompany);

// Updating company with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", auth, companyController.updateCompany);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", auth, companyController.deleteCompany);

// Getting company with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", auth, companyController.getCompany);

module.exports = router;
