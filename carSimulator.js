// Make connection
const io = require("socket.io-client");
var socket = io("http://localhost:3000");

function trackCarLocation() {
  let xCord = Math.floor(Math.random() * 586);
  let yCord = Math.floor(Math.random() * 501);
  console.log("xCord: ", xCord);
  console.log("yCord: ", yCord);
  socket.emit("trackCarLocation", {
    xCord,
    yCord,
  });
  setTimeout(trackCarLocation, 3000);
}

trackCarLocation();

// // Listen for events
// socket.on("chat", function (data) {
//   output.innerHTML +=
//     "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
// });
