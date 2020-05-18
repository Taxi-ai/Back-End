const { User } = require("../models/user");
const { Package } = require("../models/package");
const { validate } = require("../models/registerPackage");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const moment = require("moment");

// Getting Users Data
exports.registerUserPackage = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if it's a valid user
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  // Check if it's a valid package

  if (user.usedPackage.packageId && user.usedPackage.endDate != moment())
    return res.status(400).send("this user is already registered in a package");

  let package = await Package.findOne({ _id: req.body.packageId });
  if (!package) return res.status(400).send("this package doesn't exist");

  if (!user.creditCard.type)
    return res
      .status(400)
      .send("please fill the credit card info in your profile");
  // Set current date and package end date
  const startDate = moment();
  const endDate = moment().add(package.duration, "M");
  // Update user package fields
  user.usedPackage = {
    packageId: req.body.packageId,
    startingDate: startDate,
    endingDate: endDate,
  };
  user = await user.save();

  User.findById(user._id)
    .populate({
      path: "usedPackage.packageId",
      select:
        "category duration price numberOfRides limitedPricePerRide numberOfGiftCodes",
    })
    .exec(function (err, user) {
      if (!err) res.send(user);
    });
};
