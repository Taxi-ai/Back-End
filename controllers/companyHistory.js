const { CompanyHistory, validate } = require("../models/companyHistory");
const _ = require("lodash");

// Getting all companies
exports.getAllCompaniesHistory = async (req, res, next) => {
  CompanyHistory.find()
    .populate({
      path: "companyId",
      select: "name _id"
    })
    .exec(function(err, companyHistory) {
      if (!err) res.send(companyHistory);
    });
};

// Creating new company
exports.createCompanyHistory = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let companyHistory = new CompanyHistory(
    _.pick(req.body, [
      "companyId",
      "startingDate",
      "endingDate",
      "offerId",
      "feedback",
      "moneyIncome"
    ])
  );
  companyHistory = await companyHistory.save();

  res.send(companyHistory);
};

// Updating company with required ID
exports.updateCompanyHistory = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const companyHistory = await CompanyHistory.findByIdAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, [
        "companyId",
        "startingDate",
        "endingDate",
        "offerId",
        "feedback",
        "moneyIncome"
      ])
    },
    { new: true, useFindAndModify: false }
  );

  if (!companyHistory)
    return res
      .status(404)
      .send("The company history with the given ID was not found.");

  res.send(companyHistory);
};

// Deleting company with required ID
exports.deleteCompanyHistory = async (req, res, next) => {
  const companyHistory = await CompanyHistory.findByIdAndRemove(req.params._id);

  if (!companyHistory)
    return res
      .status(404)
      .send("The company history with the given ID was not found.");

  res.send(companyHistory);
};

// Getting company with required ID
exports.getCompanyHistory = async (req, res, next) => {
  const companyHistory = await CompanyHistory.findById(req.params._id);

  if (!companyHistory)
    return res
      .status(404)
      .send("The company history with the given ID was not found.");

  res.send(companyHistory);
};
