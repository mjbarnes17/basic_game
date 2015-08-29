// Grabs canvas element
var canvas = document.getElementById('canvas'),
// Grabing the 2D rendering context
    context = canvas.getContext('2d'),
    height = canvas.height,
    width = canvas.width,
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 1,
    dy = -1,
    ballRadious = 5,
    paddleHeight = 10,
    paddleWidth = 50,
    paddleX = (canvas.width - paddleWidth) / 2,
    paddleY = canvas.height - paddleHeight,
    rightPressed = false,
    leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var keyDownHandler = function(evnt) {
    if (evnt.keyCode == 39) {
        rightPressed = true;
    } else if (envt.keyCode == 37) {
        leftPressed = true;
    }
};

var keyUpHandler = function(evnt) {
    if (evnt.keyCode == 39) {
        rightPressed = false;
    } else if (envt.keyCode == 37) {
        leftPressed = false;
    }
};

// Draws paddle
var drawPaddle = function() {
  context.beginPath();
  context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = "pink";
  context.fill();
  context.closePath();
};

// Draws the ball
var drawBall = function() {
  context.beginPath();
  context.arc(x, y, ballRadious, 0, Math.PI*2);
  context.fillStyle = "lime";
  context.fill();
  context.closePath();
};

// Draws on the canvas element
var draw = function() {
  context.clearRect(0, 0, width, height);
  drawBall();
  drawPaddle();
  // Reverses the value of ball position when it reaches the top or bottom of canvas window
  if (y + dy > height - ballRadious || y + dy < ballRadious) {
    dy = -dy;
  }
  // Reverses the value of ball position when it reaches the left or right of canvas window
  if (x + dx > width - ballRadious || x + dx < ballRadious) {
    dx = -dx;
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
};



// setInterval() fires the draws every 5 miliseconds
setInterval(draw, 5);
