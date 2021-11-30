console.log("up and running");

let express = require("express");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

console.log("Server is running on http://localhost:" + port);

app.use(express.static("public"));

let serverSocket = require("socket.io");

let io = serverSocket(server);

io.on("connection", newConnection);

function newConnection(newSocket) {
  console.log(newSocket.id);
  newSocket.on("mouse", mouseMessage);

  let clientColor = getRandomColor();
  socket.emit("color", clientColor);

  let clientIndex = getRandomIndex();
  socket.emit("index", clientIndex);

  function mouseMessage(dataReceived) {
    console.log(dataReceived);

    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var greys = [
    "#303030",
    "#505050",
    "#696969",
    "#808080",
    "#989898",
    "#A9A9A9",
    "#C0C0C0",
    "#D3D3D3",
    "#F5F5F5",
  ];
  var color = greys[Math.floor(Math.random() * 9)];
  return color;
}

function getRandomIndex() {
  var index = Math.floor(Math.random() * 6);
  console.log(index);
  return index;
}
