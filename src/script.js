const playArea = document.getElementById('playArea');
const appleArea = document.getElementById('appleArea');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const body = Array.from(document.getElementsByTagName('body'));

let intervalId;
let gameSpeed = 100;
let playCtx = playArea.getContext('2d');
let appleCtx = appleArea.getContext('2d');
let gridSize = 10;
let restartButton;

appleCtx.fillStyle = 'red';

function createRand(area) {
  let num = { x: Math.round(((Math.random() * (area.width - 10)) + 0) / 10) * 10, y: Math.round(((Math.random() * (area.width - 10)) + 0) / 10) * 10 };
  console.log(num);
  return num;
}

class Snake {
  constructor() {
    this.body = [{ x: Math.floor(playArea.width / 2), y: Math.floor(playArea.height / 2) }];
    this.size = gridSize;
    this.direction = 'right';
  }
  draw() {
    if ((this.body[0].x === apple.pos.x) && (this.body[0].y === apple.pos.y)) {
      this.eat();
    }
    if (this.body[0].x > playArea.width || this.body[0].x < 0 || this.body[0].y > playArea.height || this.body[0].y < 0) {
      this.die();
    }
    playCtx.clearRect(0,0,playArea.width, playArea.height);
    playCtx.fillStyle = 'black';
    this.body.forEach((sq) => {
      playCtx.fillRect(sq.x, sq.y, this.size, this.size);
    });
  }
  move() {
    let s = this.size;
    
    if (this.body.length > 1) {
      let head = this.body[0];
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
        
        this.body.forEach((sq) => {
          if (sq.x === tail.x && sq.y === tail.y) {
            this.die();
          }
        });
        
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
        
        this.body.forEach((sq) => {
          if (sq.x === head.x && sq.y === head.y) {
            this.die();
          }
        });
        
        this.body.unshift(head);
    }
    this.draw();
  }
  eat() {
    this.body.push({ x: apple.pos.x, y: apple.pos.y  });
    apple.move();
  }
  die() {
    window.clearInterval(intervalId);
    
    let overlay = document.createElement('div');
    overlay.id = 'overlay';
    
    let p = document.createElement('p');
    p.innerHTML = 'You Died!';
    
    let button = document.createElement('button');
    button.id = 'restart';
    button.innerHTML = 'retry';
    
    overlay.appendChild(p);
    overlay.appendChild(button);
    body[0].appendChild(overlay);
    
    restartButton = document.getElementById('restart');
    
    restartButton.addEventListener('click', function (e) {
      location.reload();
    });
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
    appleCtx.clearRect(0,0,playArea.width, playArea.height);
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
        if (player.direction !== 'down') {
          player.direction = 'up';
        }
        break;
    case 39:
      case 68:
        if (player.direction !== 'left') {
          player.direction = 'right';
        }
        break;
    case 40:
      case 83:
        if (player.direction !== 'up') {
          player.direction = 'down';
        }
        break;
    case 37:
      case 65:
        if (player.direction !== 'right') {
          player.direction = 'left';
        }
        break;
  }
});








