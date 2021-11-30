console.log("up and running");

let express = require("express");
let serverSocket = require("socket.io");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

console.log("Server is running on http://localhost:" + port);

app.use(express.static("public"));

let io = serverSocket(server);

io.on("connection", newConnection);

function newConnection(newSocket) {
  console.log(newSocket.id);
  newSocket.on("mouse", mouseMessage);

  let clientColor = getRandomColor();
  serverSocket.emit("color", clientColor);
  serverSocket.broadcast.emit("newPlayer", clientColor);
  serverSocket.on("mouse", mouseMessage);

  function mouseMessage(dataReceived) {
    console.log(dataReceived);

    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
