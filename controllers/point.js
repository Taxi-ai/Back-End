const { Point } = require("../models/point");
const { validatePoints } = require("../models/addPoints");
const _ = require("lodash");

exports.getAllPoints = async (req, res, next) => {
  const points = await Point.find();
  res.send(points);
};

exports.createPoint = async (req, res, next) => {
  const { error } = validatePoints(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let points = req.body;
  points.forEach(async (element) => {
    let point = new Point(_.pick(element, ["xCord", "yCord"]));
    point = await point.save();
  });

  res.send(points);
};

exports.createPoints = async (req, res, next) => {
  const { error } = validatePoints(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let points = req.body;
  points.forEach(async (element) => {
    let point = new Point(_.pick(element, ["xCord", "yCord"]));
    point = await point.save();
  });

  res.send(points);
};

exports.updatePoint = async (req, res, next) => {};

exports.deletePoint = async (req, res, next) => {};

exports.getPoint = async (req, res, next) => {};
