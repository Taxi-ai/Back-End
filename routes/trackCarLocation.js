module.exports = function (io) {
  // catch here
  var express = require("express");
  var router = express.Router();
  // ...routes
  router.post("/", async (req, res, next) => {
    res.send("verified");
    io.on("connection", (socket) => {
      //var socketId = socket.id;
      console.log("client connected");

      socket.on("trackCarLocation", function (data) {
        // console.log(data);
        socket.broadcast.emit("trackCarLocation", {
          xCord: data.xCord,
          yCord: data.yCord,
        });
      });
    });
  });

  return router;
};
