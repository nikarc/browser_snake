const playArea = document.getElementById('playArea');
const appleArea = document.getElementById('appleArea');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let intervalId;
let gameSpeed = 500;
let playCtx = playArea.getContext('2d');
let appleCtx = appleArea.getContext('2d');
let gridSize = 10;

appleCtx.fillStyle = 'red';

function createRand(area) {
  return { x: Math.floor(Math.random() * (area.width - 0)) + 0, y: Math.floor(Math.random() * (area.width - 0)) + 0 };
}

class Snake {
  constructor() {
    this.body = [{ x: (playArea.width / 2), y: (playArea.height / 2) }];
    this.size = gridSize;
    this.direction = 'right';
  }
  draw() {
    playCtx.clearRect(0,0,playArea.width, playArea.height);
    playCtx.fillStyle = 'black';
    this.body.forEach((sq) => {
      playCtx.fillRect(sq.x, sq.y, this.size, this.size);
    });
  }
  move() {
    let s = this.size;
    
    if (this.body.length > 1) {
      let head = this.pop[0];
      let tail = this.body.pop();
    
      switch (this.direction) {
        case 'up':
          tail.y = (head.y - s);
          tail.x = head.x;
          break;
        case 'right':
          tail.x = (head.x + s);
          tail.y = head.y;
          break;
        case 'down':
          tail.y = (head.y + s);
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
        
        switch (this.direction) {
          case 'up':
            head.y = head.y - s;
            break;
          case 'right':
            head.x = head.x + s;
            break;
          case 'down':
            head.y = head.y + s;
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

class Apple {
  constructor() {
    this.pos = createRand(appleArea);
    this.size = gridSize;
  }
  place() {
    appleCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }
  move() {
    this.pos = createRand(appleArea);
    this.place();
  }
}

const player = new Snake();
const apple = new Apple();

player.draw();
apple.place();

function gameLoop() {
  player.move();
}

startButton.addEventListener('click', function (e) {
  intervalId = window.setInterval(gameLoop, gameSpeed);
});

stopButton.addEventListener('click', function (e) {
  window.clearInterval(intervalId);
});


document.addEventListener('keydown', function (e) {
  let key = e.which;
  
  switch (key) {
    case 38:
      case 87:
        player.direction = 'up';
        break;
    case 39:
      case 68:
        player.direction = 'right';
        break;
    case 40:
      case 83:
        player.direction = 'down';
        break;
    case 37:
      case 65:
        player.direction = 'left';
        break;
  }
});








