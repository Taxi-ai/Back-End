const companyHistoryController = require("../controllers/companyHistory");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Getting all admins
/*.....[Tested Successfully].......*/
router.get("/", adminAuth, companyHistoryController.getAllCompaniesHistory);

// Creating new companyHistory
/*.....[Tested Successfully].......*/
router.post("/", adminAuth, companyHistoryController.createCompanyHistory);

// Updating admin with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", adminAuth, companyHistoryController.updateCompanyHistory);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete(
  "/:_id",
  adminAuth,
  companyHistoryController.deleteCompanyHistory
);

// Getting admin with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", adminAuth, companyHistoryController.getCompanyHistory);

module.exports = router;
