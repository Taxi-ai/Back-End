const io = require("../socket");

exports.serve = async (req, res, next) => {
  res.send("hello");

  io.getIO().sockets.emit("chat", {
    message: "We're going to respond as soon as possible",
    handler: 
  });
};
