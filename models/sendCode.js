const Joi = require("joi");

function validateConfirmationCode(confirmationCode) {
  const schema = {
    code: Joi.string().required(),
  };
  return Joi.validate(confirmationCode, schema);
}

exports.validate = validateConfirmationCode;
