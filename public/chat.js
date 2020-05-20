// Make connection
var socket = io.connect("http://localhost:3000");

// Query DOM
var message = document.getElementById("message"),
  btn = document.getElementById("send"),
  output = document.getElementById("output");

// Emit events
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
  });
  message.value = "";
});

// Listen for events
socket.on("chat", function (data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});
