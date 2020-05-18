const { User, validate } = require("../models/user");
const { Notification } = require("../models/notification");
const { validateAppRate } = require("../models/appRate");

const bcrypt = require("bcrypt");
const _ = require("lodash");

// Getting Users Data
exports.getAllUsers = async (req, res, next) => {
  await User.find()
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
  const notifications = await Notification.find().sort({ dateOfPublish: -1 });
  notifications.forEach((element) => {
    user.notifications.push({ notificationId: element._id });
  });
  user = await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
};
// Updating Single User via _id
exports.updateUser = async (req, res, next) => {};
// Deleting Single User via _id
exports.deleteUser = async (req, res, next) => {};

exports.deleteUserCreditCard = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user) return res.status(400).send("The user with given id wasn't found");

  user.creditCard = null;
  user = await user.save();

  res.send(_.pick(user, ["_id", "creditCard"]));
};

exports.getUser = async (req, res, next) => {
  const user = User.findById(req.params._id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
};

exports.getUserCreditCards = async (req, res, next) => {
  const user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user.creditCard);
};

exports.getUserNotifications = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.notifications.forEach((element) => {
    element.read = true;
  });

  user = user.save();
  User.findById({ _id: req.params._id })
    .populate({
      path: "notifications.notificationId",
      select: "title body image",
    })
    .exec(function (err, user) {
      if (!err) res.send(user.notifications);
    });
};

exports.getUserAppRate = async (req, res, next) => {
  const user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user.appRate);
};

exports.addUserAppRate = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user)
    return res.status(400).send("The user with the given Id was not found");

  const { error } = validateAppRate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let rate = _.pick(req.body, ["rate", "suggestions"]);
  console.log(rate);
  user.appRate = rate;
  user = await user.save();

  res.send(_.pick(user, ["_id", "appRate"]));
};
