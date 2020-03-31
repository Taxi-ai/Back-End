const issueController = require("../controllers/issue");
const express = require("express");
const router = express.Router();

// Getting all issues
router.get("/", issueController.getAllIssues);

// Creating issue
/*
    The functions is here 
*/

// Updating issue with required ID
/*
    The functions is here
*/

// Deletes single issue object with required ID
router.delete("/:id", issueController.deleteIssue);

// Returns single issue object with required ID
router.get("/:id", issueController.getIssue);

module.exports = router;
