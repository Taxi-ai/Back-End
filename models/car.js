const Joi = require("joi");
const mongoose = require("mongoose");

const Car = mongoose.model(
  "Car",
  new mongoose.Schema({
    model: { type: String, minlength: 3, required: true },
    type: { type: String, minlength: 3, required: true },
    color: { type: String, required: true },
    isDisabled: { type: Boolean, required: true },
    isAccessed: { type: Boolean, required: true },
    currentLocation: {
      longitude: { type: String, required: true },
      latitude: { type: String, required: true }
    }
  })
);

function validateCar(car) {
  const schema = Joi.object({
    model: Joi.string()
      .min(3)
      .required(),
    type: Joi.string()
      .min(3)
      .required(),
    color: Joi.string().required(),
    isDisabled: Joi.boolean().required(),
    isAccessed: Joi.boolean().required(),
    currentLocation: Joi.object({
      longitude: Joi.string().required(),
      latitude: Joi.string().required()
    })
  });

  return schema.validate(car);
}

exports.Car = Car;
exports.validate = validateCar;
