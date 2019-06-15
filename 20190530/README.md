# 事件执行的3个阶段

* 捕获阶段（从外向内传递事件）

* 当前目标阶段（执行回调函数）

* 冒泡阶段（从内向外传递事件）



事件流程：

事件触发 =>

​	=> 父元素捕获到事件 

​	=> 传递给子元素 

​	=> 子元素捕获到事件 

​	=> 执行事件回调函数 (当前目标阶段)

​	=> 子元素抛出事件 

​	=> 父元素继续抛出事件 

​	=> 直到window对象为止



* 三个阶段中，只有两个阶段会同时执行：

  ​	捕获+当前 or 当前+冒泡；

  ​	历史问题，早期浏览器对事件处理机制的设计不同所致；

```js
let pDivEl = document.querySelector('.parent'),
    cDivEl = document.querySelector('.child');

pDivEl.addEventListener('click', function () {
    console.log('parent');
}, true);

cDivEl.addEventListener('click', function () {
    console.log('child');
}, true);
```

* `addEventListener` 第三个参数 `useCapture`，
  * 为 `true`，则 `parent` 先执行、再执行 `child`，即捕获+执行；
  * 为 `false` 则反之，即执行+冒泡（先`child` 再 `parent`）；
  * 不加 `useCapture` 则默认为：执行+冒泡；

* 类似 `onclick` 之类的定义事件的方法，默认为执行+冒泡，无法调整为捕获+执行；
* `attachEvent` 方法只能接收两个参数，默认也是执行+冒泡；