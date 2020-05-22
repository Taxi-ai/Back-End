const issueController = require("../controllers/issue");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

router.get("/", adminAuth, issueController.getAllIssues);

router.post("/", issueController.createIssue);

router.delete("/:_id", adminAuth, issueController.deleteIssue);

router.put("/:_id", adminAuth, issueController.updateIssue);

router.get("/:_id", adminAuth, issueController.getIssue);

module.exports = router;
