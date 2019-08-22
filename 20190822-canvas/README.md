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

