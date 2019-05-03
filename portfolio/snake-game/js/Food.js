class Food {
  constructor(width, height, img, oMap) {
    this.width = width;
    this.height = height;
    this.img = img;
    this.oMap = oMap; // 需要计算地图宽高，所以传进来

    // 计算地图宽高，以便算出地图能容下几个食物
    let mapStyle = getComputedStyle(this.oMap.mapEl);
    this.xCount = parseInt(mapStyle.width) / this.width;   // 横向（x轴）几个食物
    this.yCount = parseInt(mapStyle.height) / this.height; // 竖向（y轴）几个食物
  }

  render() { // 画出食物

    let foodEl = document.createElement('div');
    foodEl.style.width = this.width + 'px';
    foodEl.style.height = this.height + 'px';
    foodEl.style.background = `url(${this.img})`;

    let {x, y} = this.genRandPos(); // generate random position
    this.x = x;   // save the position to check if it's been eaten
    this.y = y;   // if position is the same as head, it's eaten

    foodEl.style.position = 'absolute';
    foodEl.style.left = x * this.width + 'px';
    foodEl.style.top = y * this.height + 'px';

    // append food to map
    this.oMap.mapEl.appendChild(foodEl);
    this.foodEl = foodEl; // 需要传出位置，用于比照是否与蛇头重合（被吃掉）
  }

  remove() { // 被吃掉后需要清除该食物
    this.foodEl.parentNode.removeChild(this.foodEl);
  }

  genRandPos() {  // generate random position for food instance
    let x = Food.getRandomInt(0, this.xCount - 1); // 食物宽度的倍数
    let y = Food.getRandomInt(0, this.yCount - 1);
    return {x: x, y: y}
  }

  static getRandomInt(min, max) { // 生成介于 min 和 max 之间的随机整数（inclusive）
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max -min) + 1) + min;
  }
}



