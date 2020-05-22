const Joi = require("joi");
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  duration: { type: Number, min: 1, max: 12, require: true },
  description: { type: String, minlength: 1, maxlength: 500, required: true },
  category: {
    type: String,
    enum: ["gold", "silver", "bronze"],
    required: true,
  },
  price: { type: Number, required: true },
  numberOfRides: { type: Number, min: 1, required: true },
  limitedPricePerRide: { type: Number, required: true },
  numberOfGiftCodes: {
    type: Number,
    min: 1,
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);

function validatePackage(package) {
  const schema = {
    duration: Joi.number().min(1).max(12).required(),
    description: Joi.number().min(1).max(500).required(),
    category: Joi.string().valid(["bronze", "silver", "gold"]).required(),
    price: Joi.number().required(),
    numberOfRides: Joi.number().required(),
    limitedPricePerRide: Joi.number().required(),
    numberOfGiftCodes: Joi.number().min(1).required(),
  };

  return Joi.validate(package, schema);
}

exports.Package = Package;
exports.validate = validatePackage;
