const { Offer, validate } = require("../models/offer");
const _ = require("lodash");

exports.getAllOffers = async (req, res, next) => {
  const offers = await Offer.find().sort({ startingDate: -1 });
  res.send(offers);
};

exports.createOffer = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let offer = new Offer(
    _.pick(req.body, [
      "code",
      "body",
      "startingDate",
      "endingDate",
      "image",
      "discount",
    ])
  );
  offer = await offer.save();

  res.send(offer);
};

exports.updateOffer = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const offer = await Offer.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: _.pick(req.body, [
        "code",
        "body",
        "startingDate",
        "endingDate",
        "image",
        "discount",
      ]),
    },
    { new: true, useFindAndModify: false }
  );

  if (!offer)
    return res.status(404).send("The offer with the given ID was not found.");

  res.send(offer);
};

exports.deleteOffer = async (req, res, next) => {
  const offer = await Offer.findByIdAndRemove(req.params._id);

  if (!offer)
    return res.status(404).send("The offer with the given ID was not found.");

  res.send(offer);
};

// Getting company with required ID
exports.getOffer = async (req, res, next) => {
  const offer = await Offer.findById(req.params._id);

  if (!offer)
    return res.status(404).send("The offer with the given ID was not found.");

  res.send(offer);
};
