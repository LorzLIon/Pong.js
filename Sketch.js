
// Create your constants, explain what these are
const INITIAL_BALL_SPEED = 4;
const BALL_RADIUS = 20;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

// Create your variables
let player1Position, player2Position;
let player1Velocity, player2Velocity;
let player1Score, player2Score;

let ball;
let ballVelocityX;
let ballVelocityY;


function setup() {
  
  createCanvas(1000, 666);

  // initialize player position to mid screen
  player1Position = player2Position = height / 2 - 50; 

  player1Velocity = 0;
  player2Velocity = 0;
  player1Score = player2Score = 0;

  // initialize ball in the middle
  ball = createVector(width / 2, height / 2); 
  
  // Create a random direction and speed for the ball
  ballVelocityX = random(-1, 1);
  ballVelocityX = ballVelocityX * INITIAL_BALL_SPEED;
  
  ballVelocityY = random(-1, 1);
  ballVelocityY = ballVelocityY * INITIAL_BALL_SPEED;

  // Add score text
  textAlign(CENTER);
  textSize(30);
  fill(260);

}

function draw() {

  background(0, 0, 0);
  
  //Step one 

  /* draw paddles */
  rect(PADDLE_WIDTH * 2, player1Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - (PADDLE_WIDTH * 3), player2Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  
  /* draw ball */
  ellipse(ball.x, ball.y, BALL_RADIUS);

  /* draw scoreboard */
  text(player1Score + "  |  " + player2Score, width / 2, 50);

  
  if (player1Score >= 5) {

    ball.x = (width/2)
    ball.y = (height/2)
  textAlign (CENTER);
    text ("GAMEOVER", width / 2, height / 2);
  }
 if (player2Score >= 5) {

    ball.x = (width/2)
    ball.y = (height/2)
  textAlign (CENTER);
    text ("GAMEOVER", width / 2, height / 2);
    
}
  

  handlePaddles();

  handleBall();
}

function handleBall() {

  ball.x += ballVelocityX;
  ball.y += ballVelocityY;

  /* top & bottom collisions */
  if (ball.y > height || ball.y < 0)
    ballVelocityY *= -1; // reverse y-velocity

  /* paddle collisions */
  if (ball.x <= PADDLE_WIDTH * 3) { // within range on the left side

    if (ball.x <= PADDLE_WIDTH) { // out of bounds

      player2Score++;
      reset();
      return;

    }

    // check collision on left paddle
    if (ball.y > player1Position && ball.y < player1Position + PADDLE_HEIGHT) {

      if (ballVelocityX < 0) { // prevent the ball from getting stuck inside paddle

        ballVelocityX *= -1;
        ballVelocityX = ballVelocityX * random(1, 1.3);
      }
    }

  } else if (ball.x >= width - (PADDLE_WIDTH * 3)) { // right paddle

    if (ball.x >= width - PADDLE_WIDTH) { // out of bounds

      player1Score++;
      reset();
      return;
    }

    
    
    // check collision on right paddle
    if (ball.y > player2Position && ball.y < player2Position + PADDLE_HEIGHT) {

      if (ballVelocityX > 0) { // prevent the ball from getting stuck inside paddle

        ballVelocityX *= -1;
        ballVelocityX = ballVelocityX * random(1, 1.3);
      }
    }

  }

}

function reset() {

  //ballVelocity.setMag(INITIAL_BALL_SPEED); // set to default speed
  ball = createVector(width / 2, height / 2); // center
}

function handlePaddles() {

  /* player one controls */
  if (keyIsDown(87)) {
    /* move up */
    player1Velocity -= 5;
  } else if (keyIsDown(83)) {
    /* move down */
    player1Velocity += 5;
  }

  /* player two controls */
  if (keyIsDown(UP_ARROW)) {
    /* move up */

    player2Velocity -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    /* move down */

    player2Velocity += 5;
  }

	/* change position */
  player1Position += player1Velocity;
  player2Position += player2Velocity;

  /* friction */
  player1Velocity *= 0.4;
  player2Velocity *= 0.4;

  /* constrain paddles */
  player1Position = constrain(player1Position, 0, height - PADDLE_HEIGHT);
  player2Position = constrain(player2Position, 0, height - PADDLE_HEIGHT);
}


  
