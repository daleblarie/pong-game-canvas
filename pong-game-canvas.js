/* global document */
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 60;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BOARD_HEIGHT = canvas.height;
const BOARD_WIDTH = canvas.width;
function Coord(x, y) {
  this.x = x;
  this.y = y;
}

function Paddle(isLeft) {
  this.width = PADDLE_WIDTH;
  this.height = PADDLE_HEIGHT;
  this.topLeft = new Coord(0, 0);
  this.isLeft = isLeft;
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
  ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
};
const lpaddle = new Paddle(true);
lpaddle.draw();

//look into clearRect for moving the paddles
//test the up and down
//adding event listeners for arrow keys
//maybe start making ball
