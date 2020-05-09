const { Admin, validate } = require("../models/admin");

const bcrypt = require("bcrypt");
const _ = require("lodash");

// Getting all admins
exports.getAllAdmins = async (req, res, next) => {
  const admins = await Admin.find().sort({ username: "asc" });
  res.send(admins);
};

exports.createAdmin = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
  if (admin) return res.status(400).send("Admin already registered");

  admin = await Admin.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (admin) return res.status(400).send("Admin already registered");

  admin = new Admin(
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
  admin.username = admin.username.toLowerCase();
  admin.email = admin.email.toLowerCase();
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  admin = await admin.save();

  res.send(_.pick(admin, ["_id", "username", "email"]));
};

// Updating admin with required ID
exports.updateAdmin = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findOneAndUpdate(
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

  if (!admin)
    return res.status(404).send("The admin with the given ID was not found.");

  res.send(admin);
};

// Deleting admin with required ID
exports.deleteAdmin = async (req, res, next) => {
  const admin = await Admin.findByIdAndRemove(req.params._id);

  if (!admin)
    return res.status(404).send("The admin with given ID was not found");

  res.send(admin);
};

exports.getAdmin = async (req, res, next) => {
  const admin = await Admin.findById(req.params._id);

  if (!admin)
    return res.status(404).send("The admin with the given ID was not found.");

  res.send(admin);
};
