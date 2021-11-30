let socket = io();
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id:" + socket.id);
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
  background("black");

  push();
  textSize(30);
  fill("black");
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
  textSize(60);
  textAlign(CENTER);
  text("LEAVE A MESSAGE FOR YOUR CRUSH", width / 2, height / 12);
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
  socket.emit("mouse", message);
}
