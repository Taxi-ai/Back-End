const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    title: Joi.string().min(15).max(99).required(),
    body: Joi.string().min(15).max(1000).required(),
    image: Joi.string(),
  };
  return Joi.validate(registration, schema);
}

exports.validateNotification = validateRegistration;
