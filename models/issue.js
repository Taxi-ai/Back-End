const Joi = require("joi");
const mongoose = require("mongoose");

const Issue = mongoose.model(
  "Issue",
  new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    label: {
      type: String,
      enum: [
        "Issue in the app",
        "Issue in the service",
        "Issue in the car",
        "others",
      ],
      required: true,
    },
    dateOfPublish: {
      type: Date,
      default: Date.now(),
    },
    body: { type: String, required: true, minlength: 30, maxlength: 500 },
  })
);

function validateIssue(issue) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    label: Joi.string()
      .valid([
        "Issue in the app",
        "Issue in the service",
        "Issue in the car",
        "others",
      ])
      .required(),
    body: Joi.string().min(30).max(500).required(),
    dateOfPublish: Joi.date(),
  });

  return schema.validate(issue);
}

exports.Issue = Issue;
exports.validate = validateIssue;
