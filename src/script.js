const playArea = document.getElementById('playArea');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let intervalId;
let gameSpeed = 1000;

class Snake {
  constructor() {
    this.body = [{ x: (playArea.width / 2), y: (playArea.height / 2) }];
    this.size = 10;
    this.directions = ['up', 'right', 'down', 'left'];
    this.currentDir = 'right';
  }
  place() {
    if (playArea.getContext) {
      let ctx = playArea.getContext('2d');
      
      this.body.forEach((sq) => {
        ctx.fillRect(sq.x, sq.y, this.size, this.size);
      });
    }
  }
  move() {
    let head = this.body[0];
    let tail = this.body.pop();
    
    switch (this.currentDir) {
      case 'up':
        tail.y = (head.y + 1);
        tail.x = head.x;
        break;
      case 'right':
        tail.x = (head.x + 1);
        tail.y = head.y;
        break;
      case 'down':
        tail.y = (head.y - 1);
        tail.x = head.x;
        break;
      case 'left':
        tail.x = (head.x - 1);
        tail.y = head.y;
        break;
    }
  }
}

const Player = new Snake();

Player.place();

function gameLoop() {
  console.log('loop');
}

startButton.addEventListener('click', function (e) {
  intervalId = window.setInterval(gameLoop, gameSpeed);
});

stopButton.addEventListener('click', function (e) {
  window.clearInterval(intervalId);
  console.log('Stop');
});


