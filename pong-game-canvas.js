/* global $ document */
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 60;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BOARD_HEIGHT = canvas.height;
const BOARD_WIDTH = canvas.width;
const BALL_RADIUS = 15;

// helper class
function Coord(x, y) {
  this.x = x;
  this.y = y;
}

function Velocity(xVel, yVel) {
  this.xVel = xVel;
  this.yVel = yVel;
}

function Score(Lscore, Rscore) {
  this.Lscore = Lscore;
  this.Rscore = Rscore;
}
Score.prototype.incrementRscore = function incrementRscore() {
  this.Rscore += 1;
};

Score.prototype.incrementLscore = function incrementLscore() {
  this.Lscore += 1;
};

Score.prototype.draw = function draw() {
  $('#Lscore span').html(this.Lscore);
  $('#Rscore span').html(this.Rscore);
};

// paddle class
function Paddle(isLeft) {
  this.width = PADDLE_WIDTH;
  this.height = PADDLE_HEIGHT;
  this.isLeft = isLeft;
  if (this.isLeft) {
    this.topLeft = new Coord(0, 0);
  } else {
    this.topLeft = new Coord(BOARD_WIDTH - this.width, 0);
  }
}

Paddle.prototype.up = function up() {
  if (this.topLeft.y > 0) {
    this.topLeft.y = this.topLeft.y - 1;
  }
};

Paddle.prototype.down = function down() {
  if (this.topLeft.y + PADDLE_HEIGHT < BOARD_HEIGHT) {
    this.topLeft.y = this.topLeft.y + 1;
  }
};


Paddle.prototype.draw = function draw() {
  ctx.fillStyle = 'rgb(200, 0 , 0)';
  if (this.isLeft) {
    ctx.clearRect(0, 0, this.width, BOARD_HEIGHT);
  } else {
    ctx.clearRect(BOARD_WIDTH - this.width, 0, this.width, BOARD_HEIGHT);
  }
  ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
};

// ball class
function Ball(lpaddle, rpaddle) {
  this.pos = new Coord(BOARD_WIDTH / 2, BOARD_HEIGHT / 2);
  this.vel = new Velocity(1, -1);
  this.height = 2 * BALL_RADIUS;
  this.width = 2 * BALL_RADIUS;
  this.lpaddle = lpaddle;
  this.rpaddle = rpaddle;
}

Ball.prototype.isInEndzone = function isInEndzone(score) {
  if (this.pos.x < 0) {
    score.incrementRscore();
    const r = window.confirm('Do you want to keep playing?');
    if (r) {
      this.pos.x = (BOARD_WIDTH / 2);
      this.pos.y = (BOARD_HEIGHT / 2);
      this.vel.xVel = 1;
      this.vel.yVel = 0;
    } else {
      this.pos.x = (BOARD_WIDTH / 2);
      this.pos.y = (BOARD_HEIGHT / 2);
      this.vel.xVel = 0;
      this.vel.yVel = 0;
    }
  }
  if (this.pos.x > BOARD_WIDTH) {
    score.incrementLscore();
    const r = window.confirm('Do you want to keep playing?');
    if (r) {
      this.pos.x = (BOARD_WIDTH / 2);
      this.pos.y = (BOARD_HEIGHT / 2);
      this.vel.xVel = -1;
      this.vel.yVel = 0;
    } else {
      this.pos.x = (BOARD_WIDTH / 2);
      this.pos.y = (BOARD_HEIGHT / 2);
      this.vel.xVel = 0;
      this.vel.yVel = 0;
      if (Score.Rscore > Score.Lscore) {
        window.alert('Right Side Won!')
      } else {
        window.alert('Left Side Won!')
      }
    }
  }
};

Ball.prototype.move = function move() {
  // cases, change velocity if needed
  // bounce off the top and bottom
  if (this.pos.y < BALL_RADIUS || this.pos.y > BOARD_HEIGHT - BALL_RADIUS) {
    this.vel.yVel *= -1;
  } else if (this.pos.x === BALL_RADIUS + PADDLE_WIDTH && (this.lpaddle.topLeft.y < this.pos.y) && this.pos.y < (this.lpaddle.topLeft.y + PADDLE_HEIGHT)) {
    this.vel.xVel = 1;
    this.vel.yVel = ((this.pos.y - this.lpaddle.topLeft.y) - (PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
  } else if (this.pos.x === BOARD_WIDTH - (BALL_RADIUS + PADDLE_WIDTH) && (this.rpaddle.topLeft.y < this.pos.y) && this.pos.y < (this.rpaddle.topLeft.y + PADDLE_HEIGHT)) {
    this.vel.xVel = -1;
    this.vel.yVel = ((this.pos.y - this.rpaddle.topLeft.y) - (PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
  }


  // actually move according to updated velocity
  this.pos.x = this.pos.x + this.vel.xVel;
  this.pos.y = this.pos.y + this.vel.yVel;
};

Ball.prototype.draw = function draw() {
  ctx.clearRect(PADDLE_WIDTH, 0, BOARD_WIDTH - (PADDLE_WIDTH * 2), BOARD_HEIGHT);
  ctx.fillStyle = 'rgb(0, 200, 0)';
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, BALL_RADIUS, 0, Math.PI * 2, 1);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

// actually run the shit
const score = new Score(0, 0);
const lpaddle = new Paddle(true);
lpaddle.draw();
const rpaddle = new Paddle(false);
rpaddle.draw();
const ball = new Ball(lpaddle, rpaddle);
ball.draw();

// event listeners
const isThisKeyPressedDown = {}; // POJO: plain old javascript object. Hash Map. Key -> value
const handler = function asdfasfasdfsda(event) {
  isThisKeyPressedDown[event.keyCode] = (event.type === 'keydown');
};

setInterval(() => {
  if (isThisKeyPressedDown[38]) { // up arrow
    rpaddle.up();
  } else if (isThisKeyPressedDown[40]) { // down arrow
    rpaddle.down();
  }
  if (isThisKeyPressedDown[87]) { // w key
    lpaddle.up();
  } else if (isThisKeyPressedDown[83]) { // s key
    lpaddle.down();
  }
  rpaddle.draw();
  lpaddle.draw();
  ball.move();
  ball.draw();
  score.draw();
  ball.isInEndzone(score);
  score.draw();
}, 5);

$(document).keydown(handler);
$(document).keyup(handler);

// restart with a score in the game loop
// confirm score and restart
// window.confirm('Do you Things?');
