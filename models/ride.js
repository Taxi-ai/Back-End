const Joi = require("joi");
const mongoose = require("mongoose");

const Ride = mongoose.model(
  "Ride",
  new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    price: { type: Number, required: true },
    isFinished: { type: Boolean, required: true },
    isCanceled: { type: Boolean, required: true },
    locationPoints: {
      longitude: { type: [String], required: true },
      latitude: { type: [String], required: true },
    },
    carId: { type: mongoose.Types.ObjectId, ref: "Car", required: true },
    rideTime: { type: Number, min: 1, required: true },
    estimatedTime: { type: Number, min: 1, required: true },
    feedback: {
      body: { type: String, minlength: 10, maxlength: 255, required: true },
      rate: { type: Number, min: 0, max: 5, required: true },
      options: { type: String, enum: ["Clean", "Time"], required: true },
    },
  })
);

function validateRide(ride) {
  const schema = {
    userId: Joi.string().required(),
    date: Joi.date().required(),
    startLocation: Joi.string().required(),
    endLocation: Joi.string().required(),
    price: Joi.number().required(),
    isFinished: Joi.boolean().required(),
    isCanceled: Joi.boolean().required(),
    locationPoints: Joi.object({
      longitude: Joi.array(Joi.string()).required(),
      latitude: Joi.array(Joi.string()).required(),
    }),
    carId: Joi.string().required(),
    rideTime: Joi.number().min(1).required(),
    estimatedTime: Joi.number().min(1).required(),
    feedback: Joi.object({
      body: Joi.string().min(10).max(255).required(),
      rate: Joi.number().min(0).max(5).required(),
      options: Joi.string().required(),
    }),
  };

  return Joi.validate(ride, schema);
}

exports.Ride = Ride;
exports.validate = validateRide;
