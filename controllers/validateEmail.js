const { validate } = require("../models/validateEmail");
const { User } = require("../models/user");
const _ = require("lodash");

exports.validateUserEmail = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("this email is already registered");

  res.send("Verified");
};
