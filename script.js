'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var playArea = document.getElementById('playArea');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');

var intervalId = undefined;
var gameSpeed = 1000;

var Snake = (function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.body = [{ x: playArea.width / 2, y: playArea.height / 2 }];
    this.size = 10;
    this.directions = ['up', 'right', 'down', 'left'];
    this.currentDir = 'right';
  }

  _createClass(Snake, [{
    key: 'place',
    value: function place() {
      var _this = this;

      if (playArea.getContext) {
        (function () {
          var ctx = playArea.getContext('2d');

          _this.body.forEach(function (sq) {
            ctx.fillRect(sq.x, sq.y, _this.size, _this.size);
          });
        })();
      }
    }
  }, {
    key: 'move',
    value: function move() {
      var head = this.body[0];
      var tail = this.body.pop();

      switch (this.currentDir) {
        case 'up':
          tail.y = head.y + 1;
          tail.x = head.x;
          break;
        case 'right':
          tail.x = head.x + 1;
          tail.y = head.y;
          break;
        case 'down':
          tail.y = head.y - 1;
          tail.x = head.x;
          break;
        case 'left':
          tail.x = head.x - 1;
          tail.y = head.y;
          break;
      }
    }
  }]);

  return Snake;
})();

var Player = new Snake();

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
//# sourceMappingURL=script.js.map