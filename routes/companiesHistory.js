const companyHistoryController = require("../controllers/companyHistory");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", adminAuth, companyHistoryController.getAllCompaniesHistory);

router.post("/", adminAuth, companyHistoryController.createCompanyHistory);

router.put("/:_id", adminAuth, companyHistoryController.updateCompanyHistory);

router.delete(
  "/:_id",
  adminAuth,
  companyHistoryController.deleteCompanyHistory
);

router.get("/:_id", adminAuth, companyHistoryController.getCompanyHistory);

module.exports = router;
