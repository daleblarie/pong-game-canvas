const ball1 = new Ball();
// THIS IS HOW `new` works
// 1. create a new, empty POJO, {}
// 2. we set `this` equal to that new POJO we just created
// 3. we run all of the code inside of the constructor
// 4. implicit return of that object

const ball2 = {
  pos: new Coord(BOARD_WIDTH / 2, BOARD_HEIGHT / 2),
  vel: new Velocity(1, 1),
  height: 3466,
  width: BALL_DIAMETER
}

const ball3 = {};
ball3.pos = [3, 5];
ball3.vel = new Velocity(1, 1);
ball3.height = 3466;
ball3.hasHeight = true;
ball3.width = BALL_DIAMETER;

// RAM
///////////////////////////
///////////////////////////
//////////////[500,26]/////////////
///////////////////////////
///////////////////////////
//////////////////[3, 5]/////////
///////////////////////////

let thing3;
thing3 = ball3.pos; // pointer, all it is is a memory address

thing3 = [500, 26];
// ball3.pos[0] = 10;

// thing3 is just a label. variable names are just labels. all it does is point to a place in memory
// pass by reference vs pass by value.

ball3.pos[0];
// thing3?????

const ball4 = {};
ball4['pos'] = new Coord(BOARD_WIDTH / 2, BOARD_HEIGHT / 2);
ball4['vel'] = new Velocity(1, 1);
ball4['height'] = 3466;
ball4['width'] = BALL_DIAMETER;

function add (num1, num3) {
  return num1 + num3;
}
