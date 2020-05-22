const Joi = require("joi");
const mongoose = require("mongoose");

const Point = mongoose.model(
  "Point",
  new mongoose.Schema({
    xCord: { type: Number, required: true },
    yCord: { type: Number, required: true },
  })
);

function validatePoint(point) {
  const schema = {
    xCord: Joi.number().required(),
    yCord: Joi.number().required(),
  };
  return Joi.validate(point, schema);
}

exports.Point = Point;
exports.validate = validatePoint;
