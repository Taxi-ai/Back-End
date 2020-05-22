const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    userId: Joi.string().required(),
    userLocation: Joi.object({
      xCord: Joi.number().required(),
      yCord: Joi.number().required(),
    }),
    targetLocation: Joi.object({
      xCord: Joi.number().required(),
      yCord: Joi.number().required(),
    }),
  };
  return Joi.validate(registration, schema);
}

exports.validateRideInformation = validateRegistration;
