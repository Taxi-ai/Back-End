const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    email: Joi.string().email().required(),
  };
  return Joi.validate(registration, schema);
}

exports.validate = validateRegistration;
