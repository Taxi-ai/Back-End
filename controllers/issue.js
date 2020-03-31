const { Issue, validate } = require("../models/issue");

// Getting all issues
exports.getAllIssues = async (req, res, next) => {
  const issues = await Issue.find().sort({ date: -1 });
  res.send(issues);
};

/*
// This function does POST request for creating an issue ...
*/

/*
// This function does PUT request for updating an issue ...
*/

// Deleting Single issue with required ID
exports.deleteIssue = async (req, res, next) => {
  const issue = await Issue.findByIdAndRemove(req.params.id);

  if (!issue)
    return res.status(404).send("The Issue with the given ID was not found.");

  res.send(issue);
};

// Getting single issue with required ID
exports.getIssue = async (req, res, next) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue)
    return res.status(404).send("The Issue with the given ID was not found.");

  res.send(issue);
};
