const { User } = require("../models/user");
const { Ride } = require("../models/ride");
const { Place } = require("../models/place");
const { Car } = require("../models/car");
const { Point } = require("../models/point");
const _Node = require("../_Node");
const points = require("../points");
const shortestPath = require("../graph");
const { validateRideInformation } = require("../models/makeRide");

const _ = require("lodash");
const moment = require("moment");

module.exports = function (io) {
  // catch here
  var express = require("express");
  var router = express.Router();
  // ...routes
  io.on("connection", async (socket) => {
    console.log("connected");
    let socketId = socket.id;
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
      userRide.startLocation = {
        xCord: userRideInformation.userLocation.xCord,
        yCord: userRideInformation.userLocation.yCord,
      };
      userRide.endLocation = {
        xCord: userRideInformation.targetLocation.xCord,
        yCord: userRideInformation.targetLocation.yCord,
      };
      userRide.Price = ridePrice;
      userRide.rideTime = estimatedTimeOfRide;

      let sourceLocation;
      let destinationLocation;
      let sourcePlace = await Place.findOne({
        place: userRideInformation.userLocation.place,
        street: userRideInformation.userLocation.street,
      });
      let destinationPlace = await Place.findOne({
        place: userRideInformation.targetLocation.place,
        street: userRideInformation.targetLocation.street,
      });
      if (!sourcePlace) {
        if (
          userRideInformation.userLocation.xCord == null ||
          userRideInformation.userLocation.yCord == null
        )
          res
            .status(400)
            .send("Please put a valid place or location in source location");
        else {
          sourceLocation = {
            xCord: userRideInformation.userLocation.xCord,
            yCord: userRideInformation.userLocation.yCord,
          };
          sourceLocation = mapPixelsToCentimeters(sourceLocation);
        }
      }
      if (!destinationPlace) {
        if (
          userRideInformation.targetLocation.xCord == null ||
          userRideInformation.targetLocation.yCord == null
        )
          res
            .status(400)
            .send("Please put a valid place or location in target location");
        else {
          destinationLocation = {
            xCord: userRideInformation.targetLocation.xCord,
            yCord: userRideInformation.targetLocation.yCord,
          };
          destinationLocation = mapPixelsToCentimeters(destinationLocation);
        }
      }
      // get real nodes close to given locations using KdTree
      let pointsFromDb = await Point.find();
      let closestPointToUserLocation;
      let closestPointToTargetLocation;
      if (!sourceLocation && !destinationLocation) {
        closestPointToUserLocation = points.getClosestPoint(
          { xCord: sourcePlace.xCord, yCord: sourcePlace.yCord },
          pointsFromDb
        );
        closestPointToTargetLocation = points.getClosestPoint(
          { xCord: destinationPlace.xCord, yCord: destinationPlace.yCord },
          pointsFromDb
        );
      } else {
        closestPointToUserLocation = points.getClosestPoint(
          sourceLocation,
          pointsFromDb
        );
        closestPointToTargetLocation = points.getClosestPoint(
          destinationLocation,
          pointsFromDb
        );
      }

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
      var carLocation1;
      var carLocation2;
      io.emit("carLocation", { message: "Send me your location" });
      socket.on("carCurrentLocation", function (data) {
        let startCarNode = new _Node("n8", data.xCord, data.yCord);
        let userLocationNode = new _Node(
          "n1",
          closestPointToUserLocation.xCord,
          closestPointToUserLocation.yCord
        );
        // send to the car source Location with shortest path to it
        var path = shortestPath.getShortestPathBetween(
          startCarNode,
          userLocationNode
        );
        path.forEach((element) => {
          console.log(element);
        });
        io.emit("goToUserLocation", path);
      });
      // io.on("connection", (socket) => {
      //   console.log(socket.id);
      //   var socketId = socket.id;
      //   console.log("client connected");
      //   // socket.on("chat", function (data) {
      //   //   // console.log(data);
      //   //   io.sockets.emit("chat", {
      //   //     message: data.message,
      //   //     handle: user.username,
      //   //   });
      //   //   io.to(socketId).emit("chat", {
      //   //     handle: "Customer Service",
      //   //     message: "we're going to respond as soon as possible",
      //   //   });
      //   // });
      //   io.emit("carLocation", { message: "Send me your location" });
      //   io.sockets.on("carCurrentLocation", function (data) {
      //     console.log(data.xCord);
      //     console.log(data.yCord);
      //     carLocation1 = data;
      //     carLocation2 = data;
      //     console.log(carLocation1);
      //     console.log(carLocation2);
      //   });
      //   // console.log(carLocation1);
      //   // console.log(carLocation2);
      // });
      // console.log(carLocation1);
      // console.log(carLocation2);
    });
  });
  return router;
};

function mapPixelsToCentimeters(point) {
  point.xCord = Math.floor((point.xCord * 585) / 1359);
  point.yCord = Math.floor((point.yCord * 500) / 1155);

  return point;
}
