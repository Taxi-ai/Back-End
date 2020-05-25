const { User } = require("../models/user");
const { Ride } = require("../models/ride");
const { Car } = require("../models/car");
const { Point } = require("../models/point");
const points = require("../points");
const { validateRideInformation } = require("../models/makeRide");

const _ = require("lodash");
const moment = require("moment");

module.exports = function (io) {
  // catch here
  var express = require("express");
  var router = express.Router();
  // ...routes
  router.post("/", async (req, res, next) => {
    const { error } = validateRideInformation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userRideInformation = _.pick(req.body, [
      "userId",
      "userLocation",
      "targetLocation",
    ]);

    let user = await User.findById(userRideInformation.userId);
    if (!user) res.status(400).send("The user with given id doesn't exist");

    // check estimated time of the ride
    let estimatedTimeOfRide = 10;
    // check ride's price
    let ridePrice = 10;
    if (user.wallet < ridePrice)
      res
        .status(400)
        .send(`The ride you want to make requires: ${ridePrice}LE`);
    user.wallet -= ridePrice;
    // access car to user
    let car = await Car.findOne();
    // update ride information
    let userRide = new Ride();
    userRide.carId = car._id;
    userRide.userId = user._id;
    userRide.dateOfRide = moment();
    userRide.startLocation = userRideInformation.userLocation;
    userRide.endLocation = userRideInformation.targetLocation;
    userRide.Price = ridePrice;
    userRide.rideTime = estimatedTimeOfRide;

    // get real nodes close to given locations using KdTree
    let sourceLocation = userRideInformation.userLocation;
    sourceLocation.xCord = Math.floor((sourceLocation.xCord * 585) / 1359);
    sourceLocation.yCord = Math.floor((sourceLocation.yCord * 500) / 1155);
    let destinationLocation = userRideInformation.targetLocation;
    destinationLocation.xCord = Math.floor(
      (destinationLocation.xCord * 585) / 1359
    );
    destinationLocation.yCord = Math.floor(
      (destinationLocation.yCord * 500) / 1155
    );
    let pointsFromDb = await Point.find();
    let closestPointToUserLocation = points.getClosestPoint(
      sourceLocation,
      pointsFromDb
    );
    let closestPointToTargetLocation = points.getClosestPoint(
      destinationLocation,
      pointsFromDb
    );
    res.send({
      closestPointToUserLocation,
      closestPointToTargetLocation,
      estimatedTimeOfRide,
      ridePrice,
      car,
    });
    // get shortest path for both userLoc and targetLoc

    // open connection with the car and user and send orders to the car

    // save ride path into the db

    // make user fill the feedback in another request

    io.on("connection", (socket) => {
      console.log(socket.id);
      var socketId = socket.id;
      console.log("client connected");

      socket.on("chat", function (data) {
        // console.log(data);
        io.sockets.emit("chat", {
          message: data.message,
          handle: user.username,
        });
        io.to(socketId).emit("chat", {
          handle: "Customer Service",
          message: "we're going to respond as soon as possible",
        });
      });
    });
  });

  return router;
};
