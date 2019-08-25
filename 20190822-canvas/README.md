# Canvas

##### 基本特性

* Canvas 是 H5 新增标签，可通过 JS 在此标签上绘制各种图案；
* Canvas 拥有多种绘制路径、矩形、圆形、字符以及图片的方法；
* 默认宽高 300px / 150px；
* 不能通过 CSS 设置画布宽高，否则会导致画布中的图案拉伸变形；
* 可通过行内宽高属性进行设置：`<canvas width="500px" height="500px"></canvas>`

###### 线条的高度

* Canvas 规定了线条默认高度 1px，默认颜色纯黑；
* 但绘制时 Canvas 会将线条的水平中心点与像素的底部对齐，导致其跨越了上下两个像素、占据了上下两个像素的各一半，实际显示效果为两个像素、颜色为黑色与无色的中和值；
* 可以在设置高度时，加上 0.5，如：`oCtx.moveTo(50, 50.5); `，就可以达到显示也是 1px 的效果；

###### 案例：绘制直线

```js
let oCanvas = document.querySelector('canvas');
let oCtx = oCanvas.getContext('2d');    // 从 canvas 中获取绘图工具；

// 通过绘图工具在 Canvas 上绘制图形
oCtx.moveTo(50, 50.5);    // 设置路径起点
oCtx.lineTo(200, 50.5);   // 设置路径终点
oCtx.stroke();            // 连接起点和终点
```

###### 线条的相关属性

```js
let canvasEl = document.querySelector('canvas');
let ctx = canvasEl.getContext('2d');

ctx.lineWidth = 50; // 线条纵向宽度（就是高度）
ctx.strokeStyle = "yellow"; // 线条颜色
ctx.lineCap = "round"; // 线条两端的样式，默认 butt，还可取值 square

ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.stroke();
```

###### 绘制多根线条

```js
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.stroke();
ctx.lineWidth = 20;
ctx.lineCap = "butt";
ctx.strokeStyle = "green";

// 重新设置起点、终点即可，但这样会复用线条样式，所有线条的宽度、颜色等一样；
ctx.moveTo(50, 150);
ctx.lineTo(200, 150);
ctx.stroke();

// 或者重新开启一个路径，单独设置各自的样式：
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(50, 150);
ctx.stroke();
ctx.lineWidth = 30;
ctx.lineCap = "square";
ctx.strokeStyle = "blue";
```

###### 绘制简单图形 - 三角形

```js
oCtx.lineWidth = 20;
oCtx.strokeStyle = "yellow";
oCtx.moveTo(50, 50);
oCtx.lineTo(200, 50);
oCtx.lineTo(200, 200);
// 默认情况下，不会自动连接起点和终点，以便使得图形闭合；
// oCtx.lineTo(50, 50); // 可以把终点设为起点的坐标，即可闭合图形；
// 但通过 lineTo 无法很好的闭合，线条较宽时，闭合点有缺角
oCtx.closePath();       // 可通过 closePath() 使其自动闭合线条端点即可完好闭合
oCtx.lineJoin = "bevel";// 转角样式：默认尖角 miter、斜角 bevel、圆角 round

```

###### 图形填充 - 四边形

```js
oCtx.moveTo(100, 100);
oCtx.lineTo(300, 100);
oCtx.lineTo(300, 300);
oCtx.lineTo(100, 300);
oCtx.closePath();

oCtx.moveTo(250, 150);
oCtx.lineTo(150, 150);
oCtx.lineTo(150, 250);
oCtx.lineTo(250, 250);
// oCtx.stroke();
oCtx.fillStyle = 'yellow';
oCtx.fill();

// 内部矩形为逆时针绘制，根据非零环绕规则，不会填充，因此最终效果为空心的四边形；
```

* 非零环绕规则：从需要填充的区域往外拉一条线，相交线为顺时针时 +1，为逆时针时 -1；结果为0就不填充，非零则填充；

###### 绘制虚线

```js
oCtx.moveTo(100, 100);
oCtx.lineTo(400, 100);
oCtx.lineWidth = 20;
oCtx.strokeStyle = 'yellow';
oCtx.lineCap = 'round';
oCtx.setLineDash([10, 35]);	// [虚线长度, 虚线间隔]
oCtx.setLineDash([5, 10, 15]);	// [虚线第一段, 虚线第二段（空白间隔），虚线第三段]
console.log(oCtx.getLineDash());// 返回数组，包含不重复的一整段虚线的长度 [5, 10, 15, 5, 10, 15]
oCtx.linDashOffset = 50;	// 正值往右移动，负值往左移动（移出左边界的部分会被覆盖、看不到）
oCtx.stroke();
```

###### 绘制表格、坐标线

```js
class LineChart {
    constructor(width = 300, height = 150) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    drawGrid(gridSize = 20) {
        let oCtx = this.ctx;
        let canvasWidth = oCtx.canvas.width;
        let canvasHeight = oCtx.canvas.height;
        let row = Math.floor(canvasHeight / gridSize);
        let col = Math.floor(canvasWidth / gridSize);
        // 绘制横线
        for (let i = 0; i < row; i++) {
            oCtx.beginPath();
            oCtx.moveTo(0, gridSize * i - 0.5);
            oCtx.lineTo(canvasWidth, gridSize * i - 0.5);
            oCtx.stroke();
        }

        // 绘制竖线
        for (let i = 0; i < col; i++) {
            oCtx.beginPath();
            oCtx.moveTo(i * gridSize - 0.5, 0);
            oCtx.lineTo(i * gridSize - 0.5, canvasWidth);
            oCtx.stroke();
        }
    }
    drawCoor(gridSize = 20) {
        let oCtx = this.ctx;
        let canvasWidth = oCtx.canvas.width;
        let canvasHeight = oCtx.canvas.height;
        // 坐标原点位置
        let originX = gridSize;
        let originY = canvasHeight - gridSize;
        // X 轴终点
        let endX = canvasWidth - gridSize;
        oCtx.beginPath();
        oCtx.strokeStyle = 'blue';
        oCtx.moveTo(originX, originY);
        oCtx.lineTo(endX, originY);
        // 箭头
        oCtx.lineTo(endX - 10, originY + 5);
        oCtx.lineTo(endX - 10, originY - 5);
        oCtx.lineTo(endX, originY);
        oCtx.fill();
        oCtx.stroke();

        // Y 轴终点
        let endY = gridSize;
        oCtx.beginPath();
        oCtx.moveTo(originX, originY);
        oCtx.lineTo(originX, endY);
        // 箭头
        oCtx.lineTo(originX - 5, endY + 10);
        oCtx.lineTo(originX + 5, endY + 10);
        oCtx.lineTo(originX, endY);
        oCtx.stroke();
        oCtx.fill();
    }
}

let lineChart = new LineChart(500, 400);
lineChart.drawGrid();
lineChart.drawCoor();
```

###### 绘制矩形

```js
ctx.fillStyle = 'orangered';
ctx.strokeStyle = 'yellow';

// 绘制矩形方式一：分别画四条边线；
ctx.moveTo(100, 100);
ctx.lineTo(200, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);
ctx.closePath();
ctx.fill();
ctx.stroke();

// 绘制矩形方式二：设置边线高度；
ctx.beginPath();
ctx.moveTo(300, 100);
ctx.lineTo(300, 200);
ctx.lineWidth = 100;
ctx.stroke();

// 绘制矩形方式三：使用 rect(x, y, w, h) 方法；
ctx.beginPath();
ctx.lineWidth = 1;
ctx.rect(400, 100, 100, 100);
ctx.fill();
ctx.stroke();

// 绘制矩形方式四：使用 strokeRect(x, y, w, h) 方法；
ctx.strokeRect(100, 300, 100, 100);
ctx.strokeStyle = 'green';
ctx.strokeRect(125, 325, 50, 50); // 会自动 beginPath()，因此设置颜色不影响以前的

// 绘制矩形方式五：使用 fillRect(x, y, w, h) 方法；
ctx.fillRect(250, 300, 100, 100);
ctx.fillStyle = 'yellow';
ctx.fillRect(275, 325, 50, 50);

// 以清除的方式绘制矩形（清空画布指定区域）；
ctx.clearRect(0, 0, 300, 300);
```



###### 渐变色

```js
let canvasEl = document.querySelector('canvas');
let ctx = canvasEl.getContext('2d');

// 创建线性渐变方案
// 四个餐宿 x0, y0, x1, y1 用于确定渐变方向和范围（矩形其中两个角的坐标）
let lg = ctx.createLinearGradient(100, 100, 300, 300);
// let lg = ctx.createRadialGradient(100, 100, 300, 300);

// 添加渐变范围和颜色：第一个参数 0~1 为百分比
lg.addColorStop(0, "pink");
lg.addColorStop(.5, "yellow")
lg.addColorStop(1, "turquoise");


// ctx.createRadialGradient(100, 100, 300, 300);

ctx.fillStyle = lg;
ctx.fillRect(100, 100, 200, 200);
```



###### 绘制圆弧

```js
// https://www.canvasapi.cn/
//context.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
// x, y 确定圆心
// radius 半径
// startAngle 开始弧度
// endAngle 结束弧度
// anticlockwise: true 逆时针，false 顺时针（默认）

ctx.arc(100, 100, 100, 0, Math.PI);
ctx.moveTo(200, 200);
ctx.arc(200, 200, 100, 0, Math.PI, true);
ctx.moveTo(300, 300);
ctx.arc(300, 300, 100, 0, Math.PI * 2, true);

ctx.stroke();
```



###### 绘制扇形

```js
ctx.moveTo(100, 100);
ctx.arc(100, 100, 100, 0, Math.PI / 2);
ctx.closePath();
ctx.fill();
```

