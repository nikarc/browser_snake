'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var playArea = document.getElementById('playArea');
var appleArea = document.getElementById('appleArea');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');

var intervalId = undefined;
var gameSpeed = 500;
var playCtx = playArea.getContext('2d');
var appleCtx = appleArea.getContext('2d');
var gridSize = 10;

appleCtx.fillStyle = 'red';

function createRand(area) {
  return { x: Math.floor(Math.random() * (area.width - 0)) + 0, y: Math.floor(Math.random() * (area.width - 0)) + 0 };
}

var Snake = (function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.body = [{ x: playArea.width / 2, y: playArea.height / 2 }];
    this.size = gridSize;
    this.direction = 'right';
  }

  _createClass(Snake, [{
    key: 'draw',
    value: function draw() {
      var _this = this;

      playCtx.clearRect(0, 0, playArea.width, playArea.height);
      playCtx.fillStyle = 'black';
      this.body.forEach(function (sq) {
        playCtx.fillRect(sq.x, sq.y, _this.size, _this.size);
      });
    }
  }, {
    key: 'move',
    value: function move() {
      var s = this.size;

      if (this.body.length > 1) {
        var head = this.pop[0];
        var tail = this.body.pop();

        switch (this.direction) {
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

        this.body.unshift(tail);
      } else {
        var head = this.body.pop();

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
      this.place();
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
//# sourceMappingURL=script.js.map