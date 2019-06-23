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



### 函数防抖的封装

* 比较不好理解的是 `this` 和 `event` 的传递，主要还是要理解 `function.apply(thisArg, [argsArray]) ` 的原理和用法；参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 上关于 `apply` 用法的说明。

```js
// 封装防抖函数
function debounce(fn, timeout) {
    let timerId = null;
    return function () {
        let self = this;
        let args = arguments; // arguments 包含了 event 属性
        timerId && clearTimeout(timerId); // 如果存在 timerId（不为 null）就执行 clear
        timerId = setTimeout(() => {
            fn.apply(self, args); // 把 this 指向调用者，并传递 arguments（包含event）
        }, timeout || 1000);
    }
}

// 防抖函数的调用
inputEl.oninput = debounce(updateText);

// 回调函数实例
function updateText(event) {
    divEl1.innerHTML = this.value; // 测试 this 是否 OK
    divEl2.innerHTML = event ? event.target : 'n/a'; // 测试 event 是否 OK
}
```

