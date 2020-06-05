const { Place } = require("../models/place");
//const { validatePlaces } = require("../models/findPlace");

const _ = require("lodash");

exports.getAllPlaces = async (req, res, next) => {
  let xCord = req.query.xCord;
  let yCord = req.query.yCord;
  let placeLocation = { xCord, yCord };
  let places;

  if (!placeLocation.xCord && !placeLocation.yCord) places = await Place.find();
  else {
    placeLocation = mapPixelsToCentimeters(placeLocation);
    console.log(placeLocation);
    places = await Place.find({
      minXRange: { $lte: placeLocation.xCord },
      maxXRange: { $gt: placeLocation.xCord },
      minYRange: { $lte: placeLocation.yCord },
      maxYRange: { $gt: placeLocation.yCord },
    });
  }

  if (places.length == 0)
    res.status(400).send("There is no places located at this area.");
  else res.send(places);
};

exports.createPlace = async (req, res, next) => {
  const { error } = validatePoints(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let points = req.body;
  points.forEach(async (element) => {
    let point = new Point(_.pick(element, ["xCord", "yCord"]));
    point = await point.save();
  });

  res.send(points);
};

exports.createPlaces = async (req, res, next) => {
  const { error } = validatePoints(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let points = req.body;
  points.forEach(async (element) => {
    let point = new Point(_.pick(element, ["xCord", "yCord"]));
    point = await point.save();
  });

  res.send(points);
};

exports.updatePlace = async (req, res, next) => {};

exports.deletePlace = async (req, res, next) => {};

exports.getPlace = async (req, res, next) => {};

function mapPixelsToCentimeters(point) {
  point.xCord = Math.floor((point.xCord * 585) / 1359);
  point.yCord = Math.floor((point.yCord * 500) / 1155);

  return point;
}
