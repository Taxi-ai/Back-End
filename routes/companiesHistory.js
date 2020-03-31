const companyHistoryController = require("../controllers/companyHistory");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

// Getting all admins
/*.....[Tested Successfully].......*/
router.get("/", auth, companyHistoryController.getAllCompaniesHistory);

// Creating new companyHistory
/*.....[Tested Successfully].......*/
router.post("/", auth, companyHistoryController.createCompanyHistory);

// Updating admin with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", auth, companyHistoryController.updateCompanyHistory);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", auth, companyHistoryController.deleteCompanyHistory);

// Getting admin with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", auth, companyHistoryController.getCompanyHistory);

module.exports = router;
