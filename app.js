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
    ballRadious = 5;

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


  if (y + dy > height - ballRadious || y + dy < ballRadious) {
    dy = -dy;
  }

  if (x + dx > width - ballRadious || x + dx < ballRadious) {
    dx = -dx;
  }
  x += dx;
  y += dy;
};

// setInterval() fires the draws every 5 miliseconds
setInterval(draw, 5);
