const Joi = require("joi");
const mongoose = require("mongoose");

const Faq = mongoose.model(
  "Faq",
  new mongoose.Schema({
    question: { type: String, minlength: 10, maxlength: 100, required: true },
    answer: { type: String, minlength: 10, maxlength: 500, required: true },
  })
);

function validateIssue(issue) {
  const schema = Joi.object({
    question: Joi.string().min(10).max(100).required(),
    answer: Joi.string().min(10).max(500).required(),
  });

  return schema.validate(issue);
}

exports.Faq = Faq;
exports.validate = validateIssue;
