class Food {
  constructor(width, height, img, oMap) {
    this.width = width || 100;
    this.height = height || 100;
    this.img = img || 'images/body.png';
    this.oMap = oMap || {};

    let mapStyle = getComputedStyle(this.oMap.mapEl);
    this.xCount = parseInt(mapStyle.width) / this.width;
    this.yCount = parseInt(mapStyle.height) / this.height;
  }

  render() {
    let foodEl = document.createElement('div');
    foodEl.style.width = this.width + 'px';
    foodEl.style.height = this.height + 'px';
    foodEl.style.background = `url(${this.img})`;

    let {x, y} = this.genRandPos();
    this.x = x;
    this.y = y;

    foodEl.style.position = 'absolute';
    foodEl.style.left = x * this.width + 'px';
    foodEl.style.top = y * this.height + 'px';

    this.oMap.mapEl.appendChild(foodEl);
    this.foodEl = foodEl;
  }

  remove() {
    this.foodEl.parentElement.removeChild(this.foodEl);
  }

  genRandPos() {
    let x = Food.getRandomInt(0, this.xCount - 1);
    let y = Food.getRandomInt(0, this.yCount - 1);
    return {x: x, y: y}
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }

}