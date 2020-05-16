const { User, validate } = require("../models/user");

const bcrypt = require("bcrypt");
const _ = require("lodash");

// Getting Users Data
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find()
    .sort({ username: "asc" })
    .populate({
      path: "usedPackage.packageId",
      select:
        "category duration price numberOfRides limitedPricePerRide numberOfGiftCodes",
    })
    .exec(function (err, users) {
      if (!err) res.send(users);
    });
};

exports.createUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) return res.status(400).send("user is already registered");

  user = await User.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (user) return res.status(400).send("user is already registered");

  user = new User(
    _.pick(req.body, [
      "username",
      "email",
      "password",
      "dateOfBirth",
      "phone",
      "address",
      "image",
    ])
  );
  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
};
// Updating Single User via _id
exports.updateUser = async (req, res, next) => {};
// Deleting Single User via _id
exports.deleteUser = async (req, res, next) => {};

exports.getUser = async (req, res, next) => {
  const user = User.findById(req.body._id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  req.send(user);
};
