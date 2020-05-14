const Joi = require("joi");
const mongoose = require("mongoose");

const Offer = mongoose.model(
  "Offer",
  new mongoose.Schema({
    code: {
      type: String,
      minlength: 8,
      maxlength: 10,
      required: true,
    },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
    limits: { type: Number, required: true },
    numberOfRides: { type: Number, min: 1, required: true },
    isCountable: { type: Boolean, required: true },
  })
);

function validateOffer(offer) {
  const schema = {
    code: Joi.String().min(8).max(10).required(),
    startingDate: Joi.Date().required(),
    endingDate: Joi.Date().required(),
    limits: Joi.Number().required(),
    numberOfRides: Joi.Number().required(),
    isCountable: Joi.Boolean().required(),
  };
  return Joi.validate(offer, schema);
}

exports.Offer = Offer;
exports.validate = validateOffer;
