const { User, validate } = require("../models/user");

module.exports = function (io) {
  // catch here
  var express = require("express");
  var router = express.Router();
  // ...routes
  router.post("/", async (req, res, next) => {
    let user = await User.findById(req.body.userId);

    res.send("verified");
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
