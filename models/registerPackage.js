const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    packageId: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    creditCard: Joi.object({
      type: Joi.string().valid(["Visa", "Master Card"]).required(),
      cardHolder: Joi.string().min(10).max(255).required(),
      cvv: Joi.number().min(100).max(999).required(),
      creditCardNumber: Joi.string().min(16).max(16).required(),
      expirationDate: Joi.date().required(),
    }),
  };
  return Joi.validate(registration, schema);
}

exports.validatePackage = validateRegistration;
