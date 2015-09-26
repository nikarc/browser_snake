'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var playArea = document.getElementById('playArea');
var appleArea = document.getElementById('appleArea');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var body = Array.from(document.getElementsByTagName('body'));

var intervalId = undefined;
var gameSpeed = 100;
var playCtx = playArea.getContext('2d');
var appleCtx = appleArea.getContext('2d');
var gridSize = 10;
var restartButton = undefined;

appleCtx.fillStyle = 'red';

function createRand(area) {
  var num = { x: Math.round((Math.random() * (area.width - 10) + 0) / 10) * 10, y: Math.round((Math.random() * (area.width - 10) + 0) / 10) * 10 };
  console.log(num);
  return num;
}

var Snake = (function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.body = [{ x: Math.floor(playArea.width / 2), y: Math.floor(playArea.height / 2) }];
    this.size = gridSize;
    this.direction = 'right';
  }

  _createClass(Snake, [{
    key: 'draw',
    value: function draw() {
      var _this = this;

      if (this.body[0].x === apple.pos.x && this.body[0].y === apple.pos.y) {
        this.eat();
      }
      if (this.body[0].x > playArea.width || this.body[0].x < 0 || this.body[0].y > playArea.height || this.body[0].y < 0) {
        this.die();
      }
      playCtx.clearRect(0, 0, playArea.width, playArea.height);
      playCtx.fillStyle = 'black';
      this.body.forEach(function (sq) {
        playCtx.fillRect(sq.x, sq.y, _this.size, _this.size);
      });
    }
  }, {
    key: 'move',
    value: function move() {
      var _this2 = this;

      var s = this.size;

      if (this.body.length > 1) {
        (function () {
          var head = _this2.body[0];
          var tail = _this2.body.pop();

          switch (_this2.direction) {
            case 'up':
              tail.y = head.y - s;
              tail.x = head.x;
              break;
            case 'right':
              tail.x = head.x + s;
              tail.y = head.y;
              break;
            case 'down':
              tail.y = head.y + s;
              tail.x = head.x;
              break;
            case 'left':
              tail.x = head.x - s;
              tail.y = head.y;
              break;
          }

          _this2.body.forEach(function (sq) {
            if (sq.x === tail.x && sq.y === tail.y) {
              _this2.die();
            }
          });

          _this2.body.unshift(tail);
        })();
      } else {
        (function () {
          var head = _this2.body.pop();

          switch (_this2.direction) {
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

          _this2.body.forEach(function (sq) {
            if (sq.x === head.x && sq.y === head.y) {
              _this2.die();
            }
          });

          _this2.body.unshift(head);
        })();
      }
      this.draw();
    }
  }, {
    key: 'eat',
    value: function eat() {
      this.body.push({ x: apple.pos.x, y: apple.pos.y });
      apple.move();
    }
  }, {
    key: 'die',
    value: function die() {
      window.clearInterval(intervalId);

      var overlay = document.createElement('div');
      overlay.id = 'overlay';

      var p = document.createElement('p');
      p.innerHTML = 'You Died!';

      var button = document.createElement('button');
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
  }]);

  return Snake;
})();

var Apple = (function () {
  function Apple() {
    _classCallCheck(this, Apple);

    this.pos = createRand(appleArea);
    this.size = gridSize;
  }

  _createClass(Apple, [{
    key: 'place',
    value: function place() {
      appleCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }, {
    key: 'move',
    value: function move() {
      this.pos = createRand(appleArea);
      appleCtx.clearRect(0, 0, playArea.width, playArea.height);
      this.place();
      gameSpeed = gameSpeed * 2;
    }
  }]);

  return Apple;
})();

var player = new Snake();
var apple = new Apple();

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
  var key = e.which;

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
//# sourceMappingURL=script.js.map