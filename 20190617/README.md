## 页面滚动距离的相关属性

* IE9 以上的现代浏览器       `window.pageXOffset`, `window.pageYOffset`；

* IE9 以下，标准模式    `document.documentElement.scrollLeft/Top` ；

* IE9 以下，怪异模式    `document.body.scrollLeft`, `document.body.scrollTop`；
  * 实际测试时发现，

    现代浏览器在怪异模式中也支持 `body.scrollTop/Left`，但 IE8 返回 0,0 并不支持；

    标准模式中无论现代浏览器或 IE8 均不支持 `body.scrollTop/Left` 属性；

* 兼容写法：

```js
function getPageScroll () {
    var x, y; // 用 var 定义变量以利于兼容
    if (window.pageXOffset) { // 如果是现代浏览器
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else if ('BackCompat' === document.compatMode) { // 如果是 IE9 以下的怪异模式
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    } else { // 如果是 IE9 下的标准模式
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    }
    return { // 这里也不能用 ES6 简写 return {x, y} 否则 IE 会报错
        x: x, 
        y: y
    }
```



## 工具库的封装方法

* 把常用的函数放到单独的 tools.js 文件中，再在用到的地方用 `<script src="tools.js">` 引入；

* 在 tools.js 文件中，先写一个立即执行函数，把各种工具方法写在 IIFE 里面；
* 在 tools.js 文件中，把工具库的方法绑定到 window 对象之下，使之全局可用；

```js
// tools.js
(function () {
    function getPageScroll () {
        // code here
    }
    window.getPageScroll = getPageScroll; // 把工具库的方法绑定到 window 对象之下，使之全局可用
})();
```



## 导航条吸顶效果

* 在 `window.onscroll` 事件中监听 `window.pageYOffset` （页面滚出顶部可视区域的距离，即：`window.scrollY`），并和顶部 banner 的 `offsetHeight` （content + padding + border）作比较，
* 如果 `window.pageYOffset >= bannerEl.offsetHeight` ，说明 banner 已经滚出页面顶部可视区域，此时设置导航条的定位属性 `position = fixed; top = 0; left = 0;` 使其实现吸顶效果；
* 当  `window.pageYOffset < bannerEl.offsetHeight` 是，说明 banner 已经滚回页面顶部可视区域，此时清除导航条的定位属性即可；

```js
let bannerEl = document.querySelector('#banner');
let navbarEl = document.querySelector('#navbar');
let bannerHeight = bannerEl.offsetHeight;

window.onscroll = function () {
    if (window.scrollY >= bannerHeight) { // window 对象的 pageYOffset 是 scrollY 的别名
        // banner 已经滚出页面的可视区域
        navbarEl.style.position = "fixed";
        navbarEl.style.top = "0";
        navbarEl.style.left = "0";
    } else {
        // banner 仍在/滚回页面可视区域中，定位属性设为默认值
        navbarEl.style.position = "static";  // position 的默认属性
    }
}
```



> MDN 上关于 position 的说明：留意一下，如果是默认值，则 **z-index** 等属性值无效；
>
> The element is positioned according to the normal flow of the document. The [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/top), [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/right), [`bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom), [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/left), and [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) properties have *no effect*. This is the default value.