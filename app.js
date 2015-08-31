// Grabs canvas element
var canvas = document.getElementById('canvas'),
// Grabing the 2D rendering context
    context = canvas.getContext('2d'),
    // Canvas
    height = canvas.height,
    width = canvas.width,
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 1,
    dy = -1,
    // Ball
    ballRadious = 5,
    // Paddle
    paddleHeight = 3,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth) / 2,
    paddleY = canvas.height - paddleHeight,
    // Keys
    rightPressed = false,
    leftPressed = false,
    // Bricks
    brickRowCount = 3,
    brickColumnCount = 5,
    brickWidth = 40,
    brickHeight = 10,
    brickPadding = 10,
    brickOffsetTop = 10,
    brickOffsetLeft = 30,
    bricks = [];

// Stores each brick in the bricks[]
for (col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];
  for (row = 0; row < brickRowCount; row++) {
    bricks[col][row] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

// Keyboard event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Updates the 'keydown' event's boolean value to true is key is pressed
function keyDownHandler(envt) {
    if (envt.keyCode == 39) {
        rightPressed = true;
    } else if (envt.keyCode == 37) {
        leftPressed = true;
    }
}

// Updates the 'keyup' event's boolean value to false if key is released
function keyUpHandler(envt) {
    if (envt.keyCode == 39) {
        rightPressed = false;
    } else if (envt.keyCode == 37) {
        leftPressed = false;
    }
}

// Brick collision detection
var brickCollisionDetection = function() {
  for (col = 0; col < brickColumnCount; col++) {
    for (row = 0; row < brickRowCount; row++) {
      var brick = bricks[col][row];
      if (brick.status == 1) {
        if(x > brick.x &&
            x < brick.x + brickWidth &&
            y > brick.y &&
            y < brick.y + brickHeight) {
          dy = -dy;
          brick.status = 0;
        }
      }
    }
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

// Draws Bricks field
var drawBricks = function() {
  for (col = 0; col < brickColumnCount; col++) {
    for (row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].status == 1) {
        var brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
      }
    }
  }
};

// Draws on the canvas element
var draw = function() {
  context.clearRect(0, 0, width, height);
  drawBricks();
  drawBall();
  drawPaddle();
  brickCollisionDetection();

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
