const Joi = require("joi");
const mongoose = require("mongoose");

const Issue = mongoose.model(
  "Issue",
  new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    label: {
      type: String,
      enum: ["Red", "Yellow", "Green"],
      default: "Gray",
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    title: { type: String, minlength: 5, maxlength: 255, required: true },
    body: { type: String, required: true, minlength: 10, maxlength: 255 },
    replies: {
      type: {
        adminId: { type: mongoose.Types.ObjectId, required: true },
        body: { type: String, required: true, minlength: 10, maxlength: 255 }
      },
      default: "There's no replies",
      required: false
    }
  })
);

function validateIssue(issue) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    label: Joi.string().required(),
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    body: Joi.string()
      .min(10)
      .max(255)
      .required(),
    date: Joi.date(),
    replies: Joi.object({
      adminId: Joi.string().required(),
      body: Joi.string()
        .min(10)
        .max(255)
        .required()
    }).allow(null)
  });

  return schema.validate(issue);
}

exports.Issue = Issue;
exports.validate = validateIssue;
