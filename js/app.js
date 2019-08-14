// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // position of enemy
    this.x = x;
    this.y = y;
    // speed of enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // if the enemies position exceeds convas,
    // enemy is placed at the beginning of the
    // canvas with random speed 50 - 250.
    if(this.x > 520) {
      this.x = -60;
      this.speed = 50 + startSpeed(200);
    }

    // player reset to start position if collides with enemy
    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
      player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x, y) {
  // The image/player for our player, this uses
  // a helper we've provided to easily load images
  // x and y (for the axis) sets the players initial location
  this.x = x;
  this.y = y;
  this.player = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 415;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  //move to left
  if(keyPress == 'left' && this.x > 0) {
    this.x -= 101;
  }
  if(keyPress == 'right' && this.x < 305) {
    this.x += 101;
  }
  if(keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  }
  if(keyPress == 'down' && this.y < 415) {
    this.y += 83;
  }
  if(this.y <= 0) {
    setTimeout(() => {
      this.reset();
    }, 600);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let enemyLocY = [231, 148, 64];
let startSpeed = function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

enemyLocY.forEach(function(locY) {
  enemy = new Enemy(0, locY, 50 + startSpeed(200));
  allEnemies.push(enemy);
})

let player = new Player(202, 415);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
