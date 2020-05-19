const issueController = require("../controllers/issue");
const express = require("express");
const router = express.Router();

router.get("/", issueController.getAllIssues);

router.post("/", issueController.createIssue);

router.delete("/:_id", issueController.deleteIssue);

router.put("/:_id", issueController.updateIssue);

router.get("/:_id", issueController.getIssue);

module.exports = router;
