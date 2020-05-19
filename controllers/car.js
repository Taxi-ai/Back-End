const { Car, validate } = require("../models/car");
const _ = require("lodash");

// Getting all companies
exports.getAllCars = async (req, res, next) => {
  const cars = await Car.find().sort("model");
  res.send(cars);
};

// Creating new company
exports.createCar = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let car = new Car(
    _.pick(req.body, [
      "model",
      "description",
      "color",
      "isDisabled",
      "isAccessed",
      "currentLocation",
      "image",
    ])
  );
  car = await car.save();

  res.send(car);
};

// Updating company with required ID
exports.updateCar = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const car = await Car.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, [
        "model",
        "description",
        "color",
        "isDisabled",
        "isAccessed",
        "currentLocation",
        "image",
      ]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!car)
    return res.status(404).send("The car with the given ID was not found.");

  res.send(car);
};

// Deleting company with required ID
exports.deleteCar = async (req, res, next) => {
  const car = await Car.findByIdAndRemove(req.params._id);

  if (!car)
    return res.status(404).send("The car with the given ID was not found.");

  res.send(car);
};

// Getting company with required ID
exports.getCar = async (req, res, next) => {
  const car = await Car.findById(req.params._id);

  if (!car)
    return res.status(404).send("The car with the given ID was not found.");

  res.send(car);
};
