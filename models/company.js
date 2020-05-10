const Joi = require("joi");
const mongoose = require("mongoose");

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 255, required: true },
    numberOfEmployees: { type: Number, min: 0, required: true },
    email: { type: String, required: true, minlength: 15, maxlength: 255 },
    phone: { type: String, required: true, min: 12, max: 15 },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
    },
  })
);

function validateCompany(company) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    numberOfEmployees: Joi.number().min(0).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(11).max(15).required(),
    address: Joi.object({
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
    }),
  });
  return schema.validate(company);
}

exports.Company = Company;
exports.validate = validateCompany;
