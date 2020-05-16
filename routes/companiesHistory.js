const companyHistoryController = require("../controllers/companyHistory");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", companyHistoryController.getAllCompaniesHistory);

router.post("/", companyHistoryController.createCompanyHistory);

router.put("/:_id", companyHistoryController.updateCompanyHistory);

router.delete("/:_id", companyHistoryController.deleteCompanyHistory);

router.get("/:_id", companyHistoryController.getCompanyHistory);

module.exports = router;
