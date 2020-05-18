const Joi = require("joi");
const mongoose = require("mongoose");

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    title: { type: String, minlength: 15, maxlength: 99, required: true },
    body: { type: String, minlength: 10, maxlength: 1000, required: true },
    dateOfPublish: { type: Date, required: true },
    image: {
      type: String,
      default: `https://via.placeholder.com/300x250?text=300x250+MPU
    C/O https://placeholder.com/banner-ads/`,
    },
  })
);

function validateNotification(notification) {
  const schema = Joi.object({
    title: Joi.string().min(15).max(99).required(),
    body: Joi.string().min(15).max(1000).required(),
    image: Joi.string(),
  });

  return schema.validate(notification);
}

exports.Notification = Notification;
exports.validate = validateNotification;
