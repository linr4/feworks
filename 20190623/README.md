# 函数节流

* 是什么：也是优化高频执行 JS 代码的一种手段，减少高频调用函数的执行次数；

* 作用：减少代码执行次数，提升性能；
* 应用场景： oninput / onmousemove / onscroll / onresize 等事件；
* 与防抖的区别：
  * 节流是减少高频操作所调用的函数的执行次数（如调用10次、只执行3次）；
  * 防抖是让高频操作所调用的函数只执行一次（调用10次、只执行1次）；
  * 例子：在 div 随 window 做 resize 的案例中，所看到的的差异是：
    * 使用 debounce 的页面，只有在 window resize 停下来超过 timeout 时间，div 才会做 resize；
    * 而在使用 throttle 的页面，只要 window resize 事件已触发，div 就会固定在间隔 timeout 时间之后做 resize（如：间隔500毫秒做一次），无论 window resize 是否还在过程中或是已完成。
  * 一句话总结：节流看过程，防抖看结果。



* **debounce**

```js
window.onresize = debounce(resizeDiv);

function resizeDiv() {
    divEl.style.width = window.innerWidth / 2 + 'px';
    divEl.style.height = window.innerHeight / 2 + 'px';
    console.log('resizing');
}

function debounce(fn, timeout) {
    let timerId = null;
    return function () {
        let self = this;
        let args = arguments;
        timerId && clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(self, args);
        }, timeout || 500);
    }
}
```



* **throttle**

```js
window.onresize = throttle(resizeDiv);

function resizeDiv() {
    divEl.style.width = window.innerWidth / 2 + 'px';
    divEl.style.height = window. innerHeight / 2 + 'px';
    console.log('resizing');
}

function throttle(fn, timeout) {
    let timerId = null;
    let isCallingFn = false;	// 回调函数 fn 是否已经被调用
    return function () {
        let self = this;
        let args = arguments;
        if (isCallingFn) {		// 若 fn 已被调用、正在执行，则在其完成之前不再调用
            return; 		
        }
        isCallingFn = true;		// 设置标志位、表示 fn 正在被调用和执行
        timerId && clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(self, args);
            isCallingFn = false;// fn 执行完了，标志位设回 false 表示没有被调用;
        }, timeout || 500);
    }
}

window.dispatchEvent(new Event('resize')); // 手动触发一次 resize 做 div 大小的初始化
```

