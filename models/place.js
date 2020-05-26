const Joi = require("joi");
const mongoose = require("mongoose");

const Place = mongoose.model(
  "Place",
  new mongoose.Schema({
    place: { type: String, required: true },
    street: { type: String, required: true },
    xCord: { type: Number, required: true },
    yCord: { type: Number, required: true },
  })
);

function validatePlace(place) {
  const schema = {
    place: Joi.string().required(),
    street: Joi.string().required(),
    yCord: Joi.number().required(),
    yCord: Joi.number().required(),
  };
  return Joi.validate(place, schema);
}

exports.Place = Place;
exports.validate = validatePlace;
