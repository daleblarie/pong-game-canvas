/* global $ BOARD_WIDTH:true BOARD_HEIGHT:true document */

const $game = $('#game');
BOARD_WIDTH = 19;
BOARD_HEIGHT = 10;
let Lscore = 0;
let Rscore = 0;

$game.append(() => {
  let str = '';
  for (let i = 0; i < BOARD_HEIGHT; i += 1) {
    str += '<div class="row">';
    for (let j = 0; j < BOARD_WIDTH; j += 1) {
      str += '<div class="cell"></div>';
    }
    str += '</div>';
  }
  return str;
});

function getcell(row, col) {
  const $rows = $game.find('.row');
  const $row = $($rows[row]);
  const $cells = $row.find('.cell');
  const $cell = $($cells[col]);
  return $cell;
}

// //////////////////////////////////////////////
// Paddles
function Paddle(column) {
  this.pos = [
    [4, column],
    [5, column],
    [6, column],
  ];
  this.column = column;
}

Paddle.prototype.draw = function draw() {
  for (let i = 0; i < BOARD_HEIGHT; i += 1) {
    const $cell = getcell(i, this.column);
    $cell.removeClass('paddle');
  }
  for (let i = 0; i < this.pos.length; i += 1) {
    const $cell = getcell(this.pos[i][0], this.pos[i][1]);
    $cell.addClass('paddle');
  }
};

Paddle.prototype.up = function up() {
  if (this.pos[0][0] !== 0) {
    const newedge = [this.pos[0][0] - 1, this.pos[0][1]];
    this.pos.unshift(newedge);
    this.pos.pop();
  }
};

Paddle.prototype.down = function down() {
  if (this.pos[2][0] !== BOARD_HEIGHT - 1) {
    const newedge = [this.pos[2][0] + 1, this.pos[2][1]];
    this.pos.push(newedge);
    this.pos.shift();
  }
};

function Ball(lpaddle, rpaddle) {
  this.pos = [5, 5];
  this.dirx = -1;
  this.diry = 0;
  this.lpaddle = lpaddle;
  this.rpaddle = rpaddle;
}

Ball.prototype.checkInLeftEnd = function checkInLeftEnd() {
  return this.pos[1] === 0;
};

Ball.prototype.checkInRightEnd = function checkInRightEnd() {
  return this.pos[1] === BOARD_WIDTH - 1;
};

Ball.prototype.draw = function draw() {
  const $cells = $('.cell');
  $cells.removeClass('ball');
  const $cell = getcell(this.pos[0], this.pos[1]);
  $cell.addClass('ball');
};

Ball.prototype.move = function move() {
  // ball bounces off the top and bottom of the board
  if (this.pos[0] === 0 || this.pos[0] === BOARD_HEIGHT - 1) {
    this.diry = -this.diry;
  }
  // ball bounces off the left paddle
  if (this.pos[1] === 1) {
    if (this.pos[0] === this.lpaddle.pos[0][0]) {
      if (this.pos[0] === 0) {
        this.diry = 1;
      } else {
        this.diry = -1;
      }
      this.dirx = -this.dirx;
    }
    if (this.pos[0] === this.lpaddle.pos[1][0]) {
      this.dirx = -this.dirx;
      this.diry = 0;
    }
    if (this.pos[0] === this.lpaddle.pos[2][0]) {
      if (this.pos[0] === BOARD_HEIGHT - 1) {
        this.diry = -1;
      } else {
        this.diry = 1;
      }
      this.dirx = -this.dirx;
    }
  }
  // ball bounces off the right paddle
  if (this.pos[1] === BOARD_WIDTH - 2) {
    if (this.pos[0] === this.rpaddle.pos[0][0]) {
      if (this.pos[0] === 0) {
        this.diry = 1;
      } else {
        this.diry = -1;
      }
      this.dirx = -this.dirx;
    }
    if (this.pos[0] === this.rpaddle.pos[1][0]) {
      this.dirx = -this.dirx;
      this.diry = 0;
    }
    if (this.pos[0] === this.rpaddle.pos[2][0]) {
      if (this.pos[0] === BOARD_HEIGHT - 1) {
        this.diry = -1;
      } else {
        this.diry = 1;
      }
      this.dirx = -this.dirx;
    }
  }
  if (this.pos[1] === 0) {
    this.dirx = 0;
    this.diry = 0;
    setTimeout(() => {
      this.pos = [5, 5];
    }, 0);
    setTimeout(() => {
      Rscore += 1;
      console.log(Rscore);
      this.dirx = 1;
    }, 1500);
  }
  if (this.pos[1] === BOARD_WIDTH - 1) {
    this.dirx = 0;
    this.diry = 0;
    setTimeout(() => {
      this.pos = [7, 5];
    }, 0);
    setTimeout(() => {
      Lscore += 1;
      console.log(Lscore);
      this.dirx = -1;
    }, 1500);
  }
  const xpos = this.pos[1] + this.dirx;
  const ypos = this.pos[0] + this.diry;
  this.pos = [ypos, xpos];
};

const lpaddle1 = new Paddle(0);
const rpaddle1 = new Paddle(BOARD_WIDTH - 1);
const ball = new Ball(lpaddle1, rpaddle1);
lpaddle1.draw();
rpaddle1.draw();
ball.draw();

setInterval(() => {
  if (ball.pos[1] !== 0 || ball.pos[1] !== BOARD_WIDTH - 1) {
    ball.move();
    ball.draw();
  }
}, 100);

$(document).keydown((event) => {
  event.preventDefault();
  switch (event.keyCode) {
    case 38: // up arrow
      rpaddle1.up();
      break;
    case 40: // down arrow
      rpaddle1.down();
      break;
    case 87: // w key
      lpaddle1.up();
      break;
    case 83: // s key
      lpaddle1.down();
      break;
    default:
  }
  rpaddle1.draw();
  lpaddle1.draw();
});
// function draw() {
//   const canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     const ctx = canvas.getContext('2d');
//
//     ctx.fillStyle = 'rgb(200, 0, 0)';
//     ctx.fillRect(10, 10, 50, 50);
//
//     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
//     ctx.fillRect(30, 30, 50, 50);
//   }
// }
// draw();
// ball scores
//  write a function that checks if ball is in the endzone
// stop for one full second, then start game loop again
