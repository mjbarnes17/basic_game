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

function keyDownHandler(envt) {
    if (envt.keyCode == 39) {
        rightPressed = true;
    } else if (envt.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(envt) {
    if (envt.keyCode == 39) {
        rightPressed = false;
    } else if (envt.keyCode == 37) {
        leftPressed = false;
    }
}

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

  // Reverses the value of ball position when it reaches the left or right of canvas window
  if (x + dx > width - ballRadious || x + dx < ballRadious) {
    dx = -dx;
  }
  // Reverses the value of ball position when it reaches the top or bottom of canvas window
  if (y + dy < ballRadious) {
    dy = -dy;
  } else if (y + dy > height - ballRadious) {
    // If the ball center is within the paddle width then ball will bounce of paddle
    // Otherwise it's game over
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }


  // Move the paddle left or right as long as the paddle width is within the canvas widow width
  if (rightPressed && paddleX < width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }
  x += dx;
  y += dy;
};



// setInterval() fires the draws every .5 miliseconds
setInterval(draw, 5);
