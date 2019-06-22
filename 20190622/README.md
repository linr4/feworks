# 函数防抖
- 是什么：函数防抖是优化高频执行的 JS 代码的一种手段，让被调用的函数在一次连续高频操作的过程中，只被调用一次；
- 作用：减少代码执行次数，提升性能；
- 应用场景： `oninput`、`onmousemove`、`onscroll`、`onresize` 等事件；

```js
// 文本框停止输入 500 毫秒之后才执行显示输入内容的代码

let timerId = null;
inputEl.oninput = function () {
    timerId && clearTimeout(timerId); // timerId 为 flase 则不执行 clearTimeout
    timerId = setTimeout(() => {
        spanEl.innerText = this.value;
    }, 500);
}
```

