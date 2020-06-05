const { validate } = require("../models/signInUser");
const { User } = require("../models/user");

const bcryptjs = require("bcryptjs");
const _ = require("lodash");

exports.signInUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcryptjs.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(user);
};
