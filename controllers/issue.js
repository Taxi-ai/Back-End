const { Issue, validate } = require("../models/issue");

const _ = require("lodash");
const moment = require("moment");

exports.getAllIssues = async (req, res, next) => {
  const issues = await Issue.find().sort({ dateOfPublish: -1 });
  res.send(issues);
};

exports.createIssue = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let issue = new Issue(_.pick(req.body, ["userId", "label", "body"]));
  issue.dateOfPublish = moment();

  issue = await issue.save();

  res.send(issue);
};

exports.deleteIssue = async (req, res, next) => {
  const issue = await Issue.findByIdAndRemove(req.params._id);

  if (!issue)
    return res.status(404).send("The Issue with the given ID was not found.");

  res.send(issue);
};

exports.getIssue = async (req, res, next) => {
  const issue = await Issue.findById(req.params._id);

  if (!issue)
    return res.status(404).send("The Issue with the given ID was not found.");

  res.send(issue);
};

exports.updateIssue = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const issue = await Issue.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, ["userId", "label", "body"]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!issue)
    return res.status(404).send("The issue with the given ID was not found.");

  res.send(issue);
};
