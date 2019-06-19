# 页面滚动至顶部 - 带缓动效果（Ease Out）

```js
goTopEl.onclick = () => {
    let timerId = null;
    let curPos = window.scrollY; // alias to window.pageYOffset
    let tgtPos = 0;

    clearInterval(timerId);
    timerId = setInterval(() => {
        let inc = (tgtPos - curPos) * .2; // incrementer, decreases each interval
        curPos = curPos + inc; // set current Y position of the page
        if (curPos < 1) {      // page has scrolled very closed to its top
            clearInterval(timerId); // end scroll function
            return false;
        } else {
            document.documentElement.scrollTop = curPos; // scroll page up
            // window.scrollTo(0, curPos); // this also works the same way
        }
    }, 50);
};
```



* 通过设置 `document.documentElement.scrollTop` 属性来滚动页面，或者
* 也可以通过调用 `window.scrollTop(x, y)` 方法使页面滚动，一样的效果；



* 缓动动画 (Ease out - start fast, end slowly) 实现的关键点：
  * 要实现移动效果的目标元素 (`elm`) 的当前位置：`curPos` (current position)；
  * `elm` 要移动到的最终位置：`tgtPos` (target position)；
  * 逐次递减的步长 (step/incrementor)，计算公式：步长 = (最终位置 - 当前位置) * 小于1的系数；