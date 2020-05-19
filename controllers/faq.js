const { Faq, validate } = require("../models/faq");
const _ = require("lodash");

// Getting all companies
exports.getAllFaqs = async (req, res, next) => {
  const faqs = await Faq.find().sort("model");
  res.send(faqs);
};

// Creating new company
exports.createFaq = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let faq = new Faq(_.pick(req.body, ["question", "answer"]));
  faq = await faq.save();

  res.send(faq);
};

// Updating company with required ID
exports.updateFaq = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const faq = await Faq.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, ["question", "answer"]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!faq)
    return res.status(404).send("The faq with the given ID was not found.");

  res.send(faq);
};

// Deleting company with required ID
exports.deleteFaq = async (req, res, next) => {
  const faq = await Faq.findByIdAndRemove(req.params._id);

  if (!faq)
    return res.status(404).send("The faq with the given ID was not found.");

  res.send(faq);
};

// Getting company with required ID
exports.getFaq = async (req, res, next) => {
  const faq = await Faq.findById(req.params._id);

  if (!faq)
    return res.status(404).send("The car with the given ID was not found.");

  res.send(faq);
};
