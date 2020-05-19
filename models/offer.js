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
    discount: { type: Number, min: 0, max: 100, required: true },
    body: { type: String, minlength: 0, maxlength: 255, required: true },
    image: {
      type: String,
      default: `https://via.placeholder.com/300x250?text=300x250+MPU
    C/O https://placeholder.com/banner-ads/`,
    },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
  })
);

function validateOffer(offer) {
  const schema = {
    code: Joi.string().min(8).max(10).required(),
    body: Joi.string().min(0).max(255).required(),
    image: Joi.string(),
    discount: Joi.number().min(0).max(100).required(),
    startingDate: Joi.date().required(),
    endingDate: Joi.date().required(),
  };
  return Joi.validate(offer, schema);
}

exports.Offer = Offer;
exports.validate = validateOffer;
