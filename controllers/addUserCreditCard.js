const { User } = require("../models/user");
const { validate } = require("../models/addUserCreditCard");

const _ = require("lodash");

exports.addCreditCard = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("this user doesn't exist");

  let creditCardInfo = _.pick(req.body, ["creditCard"]);
  user.creditCard = creditCardInfo.creditCard;

  user = await user.save();

  let userFromDb = await User.findById(req.body.userId);
  res.send(userFromDb);
};
