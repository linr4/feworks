class Snake {
  constructor(sParam) {
    sParam = sParam || {}; // 设定默认值为空对象，以防没有传参时报错

    this.width = sParam.width || 100; // size of snake's each body part
    this.height = sParam.height || 100;
    this.bodyImg = sParam.bodyImg || 'images/body.png';
    this.headImg = sParam.headImg || 'images/head.png';
    this.oMap = sParam.oMap || {};   // 用于检测是否超出地图边界

    this.bodies = [          // 蛇的初始位置
      {x: 2, y: 1, type: 1}, // 头，水平位置是宽度的2倍，垂直位置是高度1倍
      {x: 1, y: 1, type: 0}, // 身体中段，水平位置是宽度的1倍，垂直位置是高度1倍
      {x: 0, y: 1, type: 0}  // 身体末端
    ];

    // 计算地图宽高，以便算出地图能容下几个食物
    let mapStyle = getComputedStyle(this.oMap.mapEl);
    this.xCount = parseInt(mapStyle.width) / this.width;   // 横向（x轴）几个食物
    this.yCount = parseInt(mapStyle.height) / this.height; // 竖向（y轴）几个食物

    document.body.onkeydown = (ev) => {
      this.key = ev.key;  // 保存按下的是哪个方向键，以便后续调整挪动方向
    }
  }

  move() {  // 让蛇身的后一节 x,y 等于前一节的 x, y，达到向前挪动的效果；蛇头在inspect()中操作
    for (let i = this.bodies.length - 1; i > 0; i--) {
      this.bodies[i].x = this.bodies[i - 1].x;
      this.bodies[i].y = this.bodies[i - 1].y;
      this.bodies[i].type = 0;    // type = 0 为蛇身，=1 蛇头
    }
  }

  inspect(oFood) { // 操作蛇头前进方向，以及判断是否超出边界

    // 蛇头前进方向的判断
    let snakeHead = this.bodies[0]; // 蛇头
    switch (this.key) {
      case 'ArrowLeft': // 按了左方向键
        snakeHead.x = snakeHead.x - 1; // 向左挪动
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
        snakeHead.x = snakeHead.x + 1; // 默认向右
        break;
    }

    // 是否超出边界的判断
    if (snakeHead.x < 0 // 超出左边界
      ||snakeHead.y < 0  // 超出上边界
      ||snakeHead.x >= this.xCount    // 超出右边界
      ||snakeHead.y >= this.yCount) { // 超出下边界

      clearInterval(this.timer);
      alert('Game Over!');
      return false; // 退出，不再执行以下代码
    }

    // 判断是否吃到食物，吃到就增加蛇身
    if (snakeHead.x === oFood.x && snakeHead.y === oFood.y) { // 蛇头位置和食物位置重合

      let lastBody = this.bodies[this.bodies.length - 1];
      let newBody = {x: lastBody.x,
                     y: lastBody.y,
                     type: 0};

      this.bodies.push(newBody); // 增加蛇身

      switch (this.key) { // 判断新增蛇尾应该往哪个方向挪动
        case 'ArrowLeft':
          newBody.x = newBody.x + 1; // 向左挪动
          break;
        case 'ArrowRight':
          newBody.x = newBody.x - 1; // 向右挪动
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

      oFood.remove(); // 删掉现有食物
      oFood.render(); // 再生成新的食物
    }
    return true;
  }


  update(oFood) {  // 定时刷新蛇的位置，实现挪动的效果
    this.timer = setInterval(() => {
      this.move(); // 开始挪动
      if (this.inspect(oFood)) { // 如果没有超出边界
        this.render(); // 在新的位置画出蛇
        }
    }, 500);
  }



  render() { // 画蛇

    // 删除现有的整条蛇（否则挪动之后旧的蛇身没有清除、会与新的重合）
    let wholeSnake = document.querySelectorAll('.snake');

    // 还没有蛇的时候，wholeSnake为空、i = -1，不会执行 for 里面的代码
    // 要从后往前逐节删除蛇身数组 <---- 删除数组元素的正确方向和方法
    for (let i = wholeSnake.length - 1; i >= 0; i--) {
      let snakeEl = wholeSnake[i];
      snakeEl.parentNode.removeChild(snakeEl);
    }

    // 开始画蛇
    for (let val of this.bodies) { // 取出每节蛇身，逐个创建
      let snakeEl = document.createElement('div');

      snakeEl.style.width = this.width + 'px';
      snakeEl.style.height = this.height + 'px';
      snakeEl.className = 'snake';

      if (val.type === 1) {  // 如果是蛇头
        snakeEl.style.background = `url(${this.headImg})`; // 蛇头图片
      } else { // 如果是蛇身
        snakeEl.style.background = `url(${this.bodyImg})`; // 蛇身图片
      }
      // 设置蛇身显示位置
      snakeEl.style.position = 'absolute';
      snakeEl.style.left = val.x * this.width + 'px';
      snakeEl.style.top = val.y * this.height + 'px';

      // 添加到 <body> 中、显示出来
      this.oMap.mapEl.appendChild(snakeEl);
    }
  }
}