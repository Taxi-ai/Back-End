const { User } = require("../models/user");
const { validate } = require("../models/signInUser");

const _ = require("lodash");
const bcrypt = require("bcrypt");

// Getting Users Data
exports.cancelPackage = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if it's a valid user
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (!user.usedPackage.packageId)
    return res.status(400).send("this user isn't registered in any package");
  // Check if it's a valid package
  user.usedPackage = null;

  user = await user.save();

  res.send(user);
};
