const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 255 },
  password: { type: String, required: true, minlength: 9, maxlength: 255 },
  email: { type: String, required: true, minlength: 15, maxlength: 255 },
  wallet: {
    type: Number,
    default: 20,
    min: 0,
    get: (v) => Math.round(),
  },
  address: { country: String, city: String, street: String },
  dateOfBirth: { type: Date },
  phone: { type: String, required: true, minlength: 11, maxlength: 15 },
  favoriteLocation: [
    {
      category: {
        type: String,
        enum: ["Gym", "Cafe & Restaurant", "Home", "Work", "Shopping"],
      },
      icon: { type: String },
      address: {
        longitude: { type: String },
        latitude: { type: String },
        country: { type: String },
        city: { type: String },
        street: { type: String },
      },
    },
  ],
  creditCard: {
    type: { type: String, enum: ["Visa", "Master Card"] },
    cardHolder: {
      type: String,
      minlength: 10,
      maxlength: 255,
    },
    cvv: { type: Number, min: 100, max: 999 },
    creditCardNumber: { type: String, min: 16, max: 16 },
    expirationDate: { type: Date },
  },
  usedOffer: {
    offerId: { type: mongoose.Types.ObjectId, ref: "Offer" },
    offerCount: { type: Number },
  },
  usedPackage: {
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "Package",
    },
    startingDate: { type: Date },
    endingDate: { type: Date },
  },
  image: {
    type: String,
    default: `https://via.placeholder.com/150x150?text=125x125+Square+Button
  C/O https://placeholder.com/banner-ads/`,
  },
});

/*
userSchema.virtual("usedPackage.isFinished").get(function () {
  return this.usedPackage.startingDate == this.usedPackage.endingDate;
});
*/

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(10).max(255).required(),
    email: Joi.string().email(),
    wallet: Joi.number().min(0),
    address: Joi.object({
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
    }),
    favoriteLocation: Joi.object().keys({
      category: Joi.string()
        .valid(["Gym", "Cafe & Restaurant", "Home", "Work", "Shopping"])
        .required(),
      icon: Joi.string(),
      address: Joi.object({
        longitude: Joi.string(),
        latitude: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
      }),
    }),
    dateOfBirth: Joi.date(),
    phone: Joi.string().min(11).max(15).required(),
    /*
    creditCard: Joi.object({
      type: Joi.string().required(),
      cardHolder: Joi.string().min(10).max(255).required(),
      cvv: Joi.number().min(3).max(3).required(),
      creditCardNumber: Joi.string().min(16).max(16).required(),
      expirationDate: Joi.date().required(),
    }),
    usedOffer: Joi.object({
      offerId: Joi.string().required(),
      offerCount: Joi.number().required(),
    }),
    usedPackage: Joi.object({
      packageId: Joi.string().required(),
      startingDate: Joi.date().required(),
      endingDate: Joi.date().required(),
      isFinished: Joi.boolean().required(),
    }),
    */
    image: Joi.string(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
