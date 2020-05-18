const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    rate: Joi.number().min(1).max(5).required(),
    suggestions: Joi.string().min(0).max(255),
  };
  return Joi.validate(registration, schema);
}

exports.validateAppRate = validateRegistration;
