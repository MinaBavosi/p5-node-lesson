let clientSocket = io();
let myColor = "white";

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", drawOtherMouse);
clientSocket.on("color", setColor);

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log(clientSocket.id);
}

function drawOtherMouse(data) {
  push();
  stroke(data.color);
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}

function preload() {
  myImage = loadImage("./assets/bagni.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");

  push();
  textSize(30);
  fill("balck");
  textAlign(CENTER, CENTER);

  imageMode(CENTER);
  push();
  image(myImage, width / 2, height / 2, windowWidth, windowHeight);
  pop();
}

function draw() {
  push();
  noStroke();

  fill(myColor);
  textSize(66);
  textAlign(CENTER);
  text("a message for your crush", width / 2, height / 8);
  pop();
}

function mouseDragged() {
  push();
  stroke(myColor);
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color: myColor,
  };
  clientSocket.emit("mouse", message);
}
