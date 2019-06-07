# BOM

* 是什么？
  * **DOM**：操作HTML元素的API
  * **BOM**：操作浏览器的API

* BOM 中常见对象：
  * window - 代表整个浏览器窗口，是 BOM 的顶级（全局）对象
  * navigator - 代表当前浏览器本身的信息，常通过其userAgent属性判断用户浏览器类型
  * location - 代表浏览器地址栏的信息，用于设置或获取当前URL信息
  * history - 代表浏览器的历史信息，用于实现页面的 后退、前进、刷新；基于隐私考虑，只能拿到当前session的历史信息
  * screen - 代表用户显示器的信息，实际开发中不常用



### navigator

常用其userAgent属性判断浏览器类型：

```js
var ua = window.navigator.userAgent;
	
if (/chrome/i.test(ua)) {
    console.log('chrome');
} else if (/firefox/i.test(ua)) {
    console.log('firefox');
} else if (/msie/i.test(ua)) {
    console.log('old IE');
} else if ('ActiveXObject' in window) {
    console.log('mordern IE');
}
```



### location

用于获取或设置浏览器地址栏信息：

```js
let btnEls = document.querySelectorAll('.btn');

btnEls[0].onclick = function () {
    console.log(window.location.href);	// 获取地址栏信息
};
btnEls[1].onclick = function () {
    window.location.href = 'http://www.qq.com';	// 跳转到指定URL
};
btnEls[2].onclick = function () {
    window.location.reload(); // 刷新页面，可能不更新缓存
};
btnEls[3].onclick = function () {
    window.location.reload(true); // 刷新页面，会更新缓存
};
```



### history

操作当前session的页面，前进、后退、刷新：

```js
btnForward.onclick = function () {
    window.history.forward(); // 或者用 .go()
    window.history.go(1); 	  // 前进 1 个页面
};

btnRefresh.onclick = function () {
    window.history.go(0); // 刷新当前页面
};

btnBackward.onclick = function () {
    window.history.back(); // 或者用 .go()
    window.history.go(-1); // 回退 1 个页面
};
```

