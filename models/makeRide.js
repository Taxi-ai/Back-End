const Joi = require("joi");

function validateRegistration(registration) {
  const schema = {
    userId: Joi.string().required(),
    userLocation: Joi.object({
      place: Joi.string(),
      street: Joi.string(),
      xCord: Joi.number(),
      yCord: Joi.number(),
    }),
    targetLocation: Joi.object({
      place: Joi.string(),
      street: Joi.string(),
      xCord: Joi.number(),
      yCord: Joi.number(),
    }),
  };
  return Joi.validate(registration, schema);
}

exports.validateRideInformation = validateRegistration;
