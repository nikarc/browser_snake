const playArea = document.getElementById('playArea');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let intervalId;
let gameSpeed = 1000;
let ctx = playArea.getContext('2d');

class Snake {
  constructor() {
    this.body = [{ x: (playArea.width / 2), y: (playArea.height / 2) }];
    this.size = 10;
    this.directions = ['up', 'right', 'down', 'left'];
    this.currentDir = 'right';
  }
  draw() {
    ctx.clearRect(0,0,playArea.width, playArea.height);
    this.body.forEach((sq) => {
      ctx.fillRect(sq.x, sq.y, this.size, this.size);
    });
  }
  move() {
    let s = this.size;
    
    if (this.body.length > 1) {
      let head = this.pop[0];
      let tail = this.body.pop();
    
      switch (this.currentDir) {
        case 'up':
          tail.y = (head.y + s);
          tail.x = head.x;
          break;
        case 'right':
          tail.x = (head.x + s);
          tail.y = head.y;
          break;
        case 'down':
          tail.y = (head.y - s);
          tail.x = head.x;
          break;
        case 'left':
          tail.x = (head.x - s);
          tail.y = head.y;
          break;
        }
        
        this.body.unshift(tail);
      } else {
        let head = this.body.pop();
        
        switch (this.currentDir) {
          case 'up':
            head.y = head.y + s;
            break;
          case 'right':
            head.x = head.x + s;
            break;
          case 'down':
            head.y = head.y - s;
            break;
          case 'left':
            head.x = head.x - s;
            break;
        }
        
        this.body.unshift(head);
    }
    
    this.draw();
  }
}

const Player = new Snake();

Player.draw();

function gameLoop() {
  Player.move();
}

startButton.addEventListener('click', function (e) {
  intervalId = window.setInterval(gameLoop, gameSpeed);
});

stopButton.addEventListener('click', function (e) {
  window.clearInterval(intervalId);
  console.log('Stop');
});


