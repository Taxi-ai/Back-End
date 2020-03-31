const Joi = require("joi");
const mongoose = require("mongoose");

const Package = mongoose.model(
  "Package",
  new mongoose.Schema({
    duration: { type: Number(), min: 1, max: 12, require: true },
    category: {
      type: String,
      enum: ["Platinum", "Gold", "Silver", "Bronze"],
      required: true
    },
    price: { type: Number, required: true },
    numberOfRides: { type: Number, min: 1, required: true },
    limitedPricePerRide: { type: Number, required: true }
  })
);

function validatePackage(package) {
  const schema = {
    duration: Joi.Number()
      .min(1)
      .max(12)
      .required(),
    category: Joi.String().required(),
    price: Joi.Number().required(),
    numberOfRides: Joi.Number().required(),
    limitedPricePerRide: Joi.Number().required()
  };

  return Joi.validate(package, schema);
}

exports.Package = Package;
exports.validate = validatePackage;
