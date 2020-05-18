const { Notification, validate } = require("../models/notification");
const { User } = require("../models/user");

const _ = require("lodash");
const moment = require("moment");
// Getting all companies
exports.getAllNotifications = async (req, res, next) => {
  const notifications = await Notification.find().sort({ dateOfPublish: -1 });
  res.send(notifications);
};
// Creating new company
exports.createNotification = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let notification = new Notification(
    _.pick(req.body, ["title", "body", "image", "dateOfPublish"])
  );
  notification.dateOfPublish = moment();
  notification = await notification.save();

  let users = await User.find();
  console.log(notification);

  users.forEach((element) => {
    element.notifications.push(notification);
    element = element.save();
  });

  res.send(notification);
};

// Updating company with required ID
exports.updateNotification = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notification = await Notification.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, ["title", "body", "image", "dateOfPublish"]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!notification)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(notification);
};

// Deleting company with required ID
exports.deleteNotification = async (req, res, next) => {
  const notification = await Notification.findByIdAndRemove(req.params._id);

  if (!notification)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(notification);
};

// Getting company with required ID
exports.getNotification = async (req, res, next) => {
  const notification = await Notification.findById(req.params._id);

  if (!notification)
    return res.status(404).send("The package with the given ID was not found.");

  res.send(notification);
};
