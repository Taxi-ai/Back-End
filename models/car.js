const Joi = require("joi");
const mongoose = require("mongoose");

const Car = mongoose.model(
  "Car",
  new mongoose.Schema({
    model: { type: String, minlength: 3, required: true },
    description: { type: String, minlength: 0 },
    color: { type: String, required: true },
    isDisabled: { type: Boolean, default: false },
    isAccessed: { type: Boolean, default: false },
    currentLocation: {
      xCord: { type: Number, default: null },
      yCord: { type: Number, default: null },
    },
    image: {
      type: String,
      default: `https://via.placeholder.com/150`,
    },
  })
);

function validateCar(car) {
  const schema = Joi.object({
    model: Joi.string().min(3).required(),
    description: Joi.string().min(0),
    color: Joi.string().required(),
    isDisabled: Joi.boolean(),
    isAccessed: Joi.boolean(),
    currentLocation: Joi.object({
      xCord: Joi.number(),
      yCord: Joi.number(),
    }),
  });

  return schema.validate(car);
}

exports.Car = Car;
exports.validate = validateCar;
