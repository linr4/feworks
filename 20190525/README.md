# 缓动动画

​	ease animation，开始快、结束阶段慢下来；



### 知识点：

* 只需在匀速动画的基础上，调整步长计算方法以及终值判断方法；

* 步长计算公式：**（目标位置 - 当前位置）* 缓动系数**（0 ~ 1）；因为两者差值会逐次变小，如此，再乘以缓动系数 0.x 所得到的当次步长值也会比上一次的步长要小；

  ```js
  let step = tgtPos > curPos ? 2 : -2;	// 匀速动画步长，固定值
  let step = (tgtPos - curPos) * 0.5;	// 缓动动画步长，逐渐变小
  ```

* 由于该步长计算公式的结果只会无限趋近于零、却不会等于零，因此终值判断要据此做出调整：

  ```js
  // 缓动动画终值判断：目标位置与当前位置差值小于步长
  if (Math.abs(tgtPos - curPos) <= Math.abs(step)) {}
  
  // 缓动动画终值判断：步长绝对值大于某个比较小的小数（表示盒子距目标位置只剩下 0.01px 了
  if (Math.abs(step) > 0.01) {}    
  ```

  

### 代码

```js
let btnEls = document.querySelectorAll('button');
let boxEl = document.querySelector('.box');
let curPos = parseInt(getComputedStyle(boxEl).marginLeft);
let timerId = null;

btnEls[0].onclick = ()=> {
    moveBox(boxEl, 500);
};

btnEls[1].onclick = ()=> {
    moveBox(boxEl, 200);
};

btnEls[2].onclick = ()=> {
    clearInterval(timerId);
};

function moveBox(elm, tgtPos) {
    // let step = tgtPos > curPos ? 2 : -2;

    clearInterval(timerId);
    timerId = setInterval(() => {
        let step = (tgtPos - curPos) * .05;
        console.log(step);
        
        // if (Math.abs(tgtPos - curPos) > Math.abs(step)) {
        if (Math.abs(step) > 0.01) {
            curPos = curPos + step;
        } else {
            curPos = tgtPos;
            clearInterval(timerId);
        }
        elm.style.marginLeft = curPos + 'px';
    }, 10);
}
```

