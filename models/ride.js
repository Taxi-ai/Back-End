const Joi = require("joi");
const mongoose = require("mongoose");

const Ride = mongoose.model(
  "Ride",
  new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    dateOfRide: { type: Date, default: Date.now, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    price: { type: Number, required: true },
    isFinished: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    ridePath: [
      {
        xCord: { type: Number, required: true },
        yCord: { type: Number, required: true },
      },
    ],
    carId: { type: mongoose.Types.ObjectId, ref: "Car", required: true },
    rideTime: { type: Number, min: 1, required: true },
    estimatedTime: { type: Number, min: 1, required: true },
    feedback: {
      body: { type: String, minlength: 10, maxlength: 255 },
      rate: { type: Number, min: 0, max: 5 },
      options: { type: String, enum: ["Clean", "Time"] },
    },
  })
);

function validateRide(ride) {
  const schema = {
    userId: Joi.string().required(),
    dateOfRide: Joi.date().required(),
    startLocation: Joi.string().required(),
    endLocation: Joi.string().required(),
    price: Joi.number().required(),
    isFinished: Joi.boolean(),
    isCanceled: Joi.boolean(),
    ridePath: Joi.object({
      xCord: Joi.array(Joi.string()).required(),
      yCord: Joi.array(Joi.string()).required(),
    }),
    carId: Joi.string().required(),
    rideTime: Joi.number().min(1).required(),
    estimatedTime: Joi.number().min(1).required(),
    feedback: Joi.object({
      body: Joi.string().min(10).max(255),
      rate: Joi.number().min(0).max(5),
      options: Joi.string(),
    }),
  };

  return Joi.validate(ride, schema);
}

exports.Ride = Ride;
exports.validate = validateRide;
