const { User, validate } = require("../models/user");
const { Notification } = require("../models/notification");
const { Package } = require("../models/package");
const { validatePackage } = require("../models/registerPackage");
const { validateAppRate } = require("../models/appRate");
const { validateCreditCard } = require("../models/addUserCreditCard");
const { validateWallet } = require("../models/addMoneyToWallet");
const { validateNotification } = require("../models/addUserNotification");

const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const moment = require("moment");

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
      if (!err) {
        var usersToSend = _.map(users, function (user) {
          return _.pick(user, [
            "username",
            "email",
            "dateOfBirth",
            "phone",
            "address",
            "image",
            "wallet",
            "notifications",
            "favoriteLocations",
            "appRate",
            "usedOffer",
            "usedPackage",
          ]);
        });
        res.send(usersToSend);
      }
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
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
  const notifications = await Notification.find().sort({ dateOfPublish: -1 });
  notifications.forEach((element) => {
    user.notifications.push({ notificationId: element._id });
  });
  user = await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
};
// Updating Single User via _id
exports.updateUser = async (req, res, next) => {
  const { error } = validateCreditCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, [
        "username",
        "email",
        "password",
        "dateOfBirth",
        "phone",
        "address",
        "image",
      ]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
};
// Deleting Single User via _id
exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params._id);

  if (!user) res.status(404).send("the user with the given id was not found");

  res.send(user);
};

exports.deleteUserCreditCard = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user) return res.status(400).send("The user with given id wasn't found");

  user.creditCard = null;
  user = await user.save();

  res.send(_.pick(user, ["_id", "creditCard"]));
};

exports.addUserCreditCard = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user) return res.status(400).send("The user with given id wasn't found");

  const { error } = validateCreditCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let creditCardInfo = req.body;
  user.creditCard = creditCardInfo;

  user = await user.save();

  res.send(_.pick(user, ["_id", "creditCard"]));
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params._id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(
    _.pick(user, [
      "username",
      "email",
      "dateOfBirth",
      "phone",
      "address",
      "image",
      "wallet",
      "notifications",
      "favoriteLocations",
      "appRate",
      "usedOffer",
      "usedPackage",
    ])
  );
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

exports.createUserNotifications = async (req, res, next) => {
  const { error } = validateNotification(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.notifications.push(_.pick(req.body, ["title", "body"]));

  user = await user.save();

  User.findById(req.params._id)
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

exports.getUserPackage = async (req, res, next) => {
  const user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(_.pick(user, ["_id", "usedPackage"]));
};

exports.deleteUserPackage = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.usedPackage = null;
  user = await user.save();

  res.send(_.pick(user, ["_id", "usedPackage"]));
};

exports.addUserPackage = async (req, res, next) => {
  const { error } = validatePackage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if it's a valid user
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcryptjs.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  // Check if it's a valid package

  if (user.usedPackage.packageId && user.usedPackage.endDate != moment())
    return res.status(400).send("this user is already registered in a package");

  let package = await Package.findOne({ _id: req.body.packageId });
  if (!package) return res.status(400).send("this package doesn't exist");

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
      if (!err) res.send(_.pick(user, ["user_id", "usedPackage"]));
    });
};

exports.addMoneyToWallet = async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user)
    return res.status(400).send("The user with the given Id was not found");

  const { error } = validateWallet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let amountOfMoneyToAdd = _.pick(req.body, ["creditCard", "amount"]);
  user.wallet += amountOfMoneyToAdd.amount;

  user = await user.save();

  res.send(_.pick(user, ["_id", "wallet"]));
};
