const { Package, validate } = require("../models/package");
const _ = require("lodash");

// Getting all companies
exports.getAllPackages = async (req, res, next) => {
  const packages = await Package.find().sort("name");
  res.send(packages);
};

// Creating new company
exports.createPackage = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let package = new Package(
    _.pick(req.body, [
      "duration",
      "category",
      "price",
      "numberOfRides",
      "limitedPricePerRide",
      "numberOfGiftCodes",
    ])
  );

  let packageInDb = await Package.findOne({ category: package.category });
  if (packageInDb)
    return res
      .status(400)
      .send("the package with given category exists before");

  package = await package.save();

  res.send(package);
};

// Updating company with required ID
exports.updatePackage = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const package = await Package.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, [
        "duration",
        "category",
        "price",
        "numberOfRides",
        "limitedPricePerRide",
        "numberOfGiftCodes",
      ]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!package)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(package);
};

// Deleting company with required ID
exports.deletePackage = async (req, res, next) => {
  const package = await Package.findByIdAndRemove(req.params._id);

  if (!package)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(package);
};

// Getting company with required ID
exports.getPackage = async (req, res, next) => {
  const package = await Package.findById(req.params._id);

  if (!package)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(package);
};
