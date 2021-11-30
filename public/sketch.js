let clientSocket = io();
let myColor = "black";
let background = [];

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);
clientSocket.on("color", setColor);
clientSocket.on("index", setIndex);

function setColor(assignedColor) {
  myColor = assignedColor;
}

function setIndex(assignedIndex) {
  myIndex = assignedIndex;
}

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  fill("red");
  circle(data.x, data.y, 10);
}

function drawOtherMouse(data) {
  push();
  noStroke();
  fill(255, 255, 255, 63);
  ellipse(data.x, data.y, 20);
  pop();
}

function preload() {
  img = loadImage("bagni.jpg");
  background.push(img);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(background[myIndex]);
  console.log(myIndex);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("a message for your crush", windowWidth / 2, windowHeight / 2);
}

function draw() {}

function mouseMoved() {
  push();
  noStroke();
  fill(myColor);
  tint(255, 126);
  ellipse(mouseX, mouseY, 20);
  pop();
  let message = {
    x: mouseX,
    y: mouseY,
  };
  clientSocket.emit("mouse", message);
}
