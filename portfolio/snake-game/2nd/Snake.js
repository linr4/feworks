class Snake {
  constructor(s) {
    s = s || {};

    this.width = s.width || 100;
    this.height = s.height || 100;
    this.bodyImg = s.bodyImg || 'images/body.png';
    this.headImg = s.headImg || 'images/head.png';
    this.oMap = oMap || {};
    
    this.bodies = [ // initial position of a snake
      {x: 2, y: 1, type: 1},  // head
      {x: 1, y: 1, type: 0},  // body
      {x: 0, y: 1, type: 0},  // body.tail
    ];

    let mapStyle = getComputedStyle(this.oMap.mapEl);
    this.xCount = parseInt(mapStyle.width) / this.width; //x-axis counts
    this.yCount = parseInt(mapStyle.height) / this.height;

    document.body.onkeydown = (ev) => {
      this.key = ev.key; // save arrow keys for later use
    };
  }

  move() { // snake moves
    for (let i = this.bodies.length - 1; i > 0; i--) {
      this.bodies[i].x = this.bodies[i - 1].x;
      this.bodies[i].y = this.bodies[i - 1].y;
      this.bodies[i].type = 0; // set it as body
    }
  }

  inspect(oFood) {
      // detect move direction
    let snakeHead = this.bodies[0];
    switch (this.key) {
      case 'ArrowLeft':
        snakeHead.x = snakeHead.x - 1;
        break;
      case 'ArrowRight':
        snakeHead.x = snakeHead.x + 1;
        break;
      case 'ArrowUp':
        snakeHead.y = snakeHead.y - 1;
        break;
      case 'ArrowDown':
        snakeHead.y = snakeHead.y + 1;
      break;
      default:
        snakeHead.x = snakeHead.x + 1;
        break;
    }

    // Boundary detection
    if (snakeHead.x < 0
      ||snakeHead.y < 0
      ||snakeHead.x >= this.xCount
      ||snakeHead.y >= this.yCount) {
        clearInterval(this.timer);
        alert('Game Over!');
        return false;
      }

    // food eaten detction
    if (snakeHead.x === oFood.x && snakeHead.y === oFood.y) {
      let lastBody = this.bodies[this.bodies.length - 1];
      let newBody = {
        x: lastBody.x,
        y: lastBody.y,
        type: 0};
      this.bodies.push(newBody);

      switch (this.key) {
        case 'ArrowLeft':
          newBody.x = newBody.x + 1;
          break;
        case 'ArrowRight':
          newBody.x = newBody.x - 1;
          break;
        case 'ArrowUp':
          newBody.y = newBody.y + 1;
          break;
        case 'ArrowDown':
          newBody.y = newBody.y - 1;
          break;
        default:
          newBody.x = newBody.x - 1;
          break;
      }

      oFood.remove();
      oFood.render();
    }
    return true;
  }

  update(oFood) {
    this.timer = setInterval(() => {
      this.move();
      if (this.inspect(oFood)) {
        this.render();
      }
    }, 500);
  }

  render() {
    let wholeSnake = document.querySelectorAll('.snake');
    for (let i = wholeSnake.length - 1; i >= 0; i--) {
      let snakeEl = wholeSnake[i];
      snakeEl.parentElement.removeChild(snakeEl);
    }

    for (let val of this.bodies) {
      let snakeEl = document.createElement('div');
      snakeEl.style.width = this.width + 'px';
      snakeEl.style.height = this.height + 'px';
      snakeEl.classList.add('snake');

      if (val.type === 1) {
        snakeEl.style.background = `url(${this.headImg})`;
      } else {
        snakeEl.style.background = `url(${this.bodyImg})`;
      }

      snakeEl.style.position = 'absolute';
      snakeEl.style.left = val.x * this.width + 'px';
      snakeEl.style.top = val.y * this.height + 'px';

      this.oMap.mapEl.appendChild(snakeEl);
    }
  }
}