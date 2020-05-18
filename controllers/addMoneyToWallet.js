const { User } = require("../models/user");
const { validate } = require("../models/addMoneyToWallet");

const _ = require("lodash");

exports.add = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("this user doesn't exist");

  let amountOfMoneyToAdd = _.pick(req.body, ["creditCard", "amount"]);
  user.wallet += amountOfMoneyToAdd.amount;

  user = await user.save();

  res.send(_.pick(user, ["_id", "wallet"]));
};
