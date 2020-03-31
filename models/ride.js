const Joi = require("joi");
const mongoose = require("mongoose");

const Ride = mongoose.model(
  "Ride",
  new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    price: { type: Number, required: true },
    isFinished: { type: Boolean, required: true },
    isCanceled: { type: Boolean, required: true },
    locationPoints: {
      longitude: { type: [String], required: true },
      latitude: { type: [String], required: true }
    },
    carId: { type: mongoose.Types.ObjectId, required: true },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    rideTime: { type: Number, min: 1, required: true },
    estimatedTime: { type: Number, min: 1, required: true },
    feedback: {
      body: { type: String, minlength: 10, maxlength: 255, required: true },
      rate: { type: Number, min: 0, max: 5, required: true },
      options: { type: String, enum: ["Clean", "Time"], required: true }
    }
  })
);

function validateRide(ride) {
  const schema = {
    userId: Joi.String().required(),
    date: Joi.Date().required(),
    startLocation: Joi.String().required(),
    endLocation: Joi.String().required(),
    price: Joi.Number().required(),
    isFinished: Joi.Boolean().required(),
    isCanceled: Joi.Boolean().required(),
    locationPoints: Joi.object({
      longitude: Joi.array(Joi.String()).required(),
      latitude: Joi.array(Joi.String()).required()
    }),
    carId: Joi.String().required(),
    userId: Joi.String().required(),
    rideTime: Joi.Number()
      .min(1)
      .required(),
    estimatedTime: Joi.Number()
      .min(1)
      .required(),
    feedback: Joi.object({
      body: Joi.String()
        .min(10)
        .max(255)
        .required(),
      rate: Joi.Number()
        .min(0)
        .max(5)
        .required(),
      options: Joi.String().required()
    })
  };

  return Joi.validate(ride, schema);
}

exports.Ride = Ride;
exports.validate = validateRide;
