const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 9, maxlength: 255 },
  email: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 255,
  },
  address: { country: String, city: String, street: String },
  dateOfBirth: { type: Date },
  phone: { type: String, required: true, minlength: 11, maxlength: 15 },
  image: {
    type: String,
    // Still required to make folder of images in server side ..
    default:
      "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg",
  },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string()
      .min(10)
      .max(255)
      .required()
      .regex(
        /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/
      ),
    email: Joi.string().email().required(),
    address: Joi.object(),
    dateOfBirth: Joi.date(),
    phone: Joi.string().min(11).max(15).required(),
    image: Joi.string().allow(null),
  });
  return schema.validate(admin);
}

exports.Admin = Admin;
exports.validate = validateAdmin;
