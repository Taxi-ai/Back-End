const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    points: Joi.object.keys({
      xCord: Joi.number().required(),
      yCord: Joi.number().required(),
    }),
    amount: Joi.number().min(1).required(),
  };
  return Joi.validate(registration, schema);
}

exports.validatePoints = validateRegistration;
