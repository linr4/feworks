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

