const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    creditCard: Joi.object({
      type: Joi.string().valid(["Visa", "Master Card"]).required(),
      cardHolder: Joi.string().min(10).max(255).required(),
      cvv: Joi.number().min(100).max(999).required(),
      creditCardNumber: Joi.string().min(16).max(16).required(),
      expirationDate: Joi.date().required(),
    }),
    amount: Joi.number().min(1).required(),
  };
  return Joi.validate(registration, schema);
}

exports.validateWallet = validateRegistration;
