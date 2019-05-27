# 轮播图 - 带缓动动画



### Tips:

* `<p>` 标签中嵌套了两个 `<span>` 作为左右箭头，但设置 `display: flex;` 先让 `<span>` 分别左右对齐，却无法生效，排查后发现是由于 `<p>` 标签没有设置宽度所致；

  ```css
  p {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;  /* 需要设置宽度，否则如下设置子元素对齐的display:flex;无法生效 */
      display: flex;
      justify-content: space-between;
  }
  ```

* 点击箭头之后，移动的应该是整个 `<ul>` 标签，而不是特定 `<li>` 标签；

* `<ul>` 的 `margin-left` 始终不大于 0，因此要留意计算其 `margin-left`的表达式中，变量要为负值；

  ```js
  moveElm(ulEl, -(imgWidth * curIdx));   // 始终不大于 0（若大于 0 则左侧就露出空白了）
  ```

* JS 代码要放在 `window.onload = function () {...}` 中运行，否则一些需要实时计算 DOM 元素的表达式可能无法取得正确的结果；如下语句，如果没有放入 window.onload 中，则在 vscode 中运行结果总是 0，在 WebStorm 中第一次运行也是 0，刷新后才能获取正确结果；原因是 DOM 元素还未完成加载、JS 代码就已运行：

  ```js
  let imgWidth = parseInt(getComputedStyle(imgEls[0]).width)
  ```

  

  

### 无限轮播图的实现原理

* 在图片列表末尾添加一张与第一张一样的图片，~~在移动到最后这张图片的动作完成之后，以不带动画的方式移动`<ul>`到第一张的位置~~，移动之前判断是否为最后一张，若然，则先以不带动画的方式把`<ul>`移动到第一张、然后再开始做动画移动到第二张，如此，用户没有感知的情况下又可以从头开始；
  * 由于`setInterval()`是异步执行，难以用上述划掉的方法来实现；
* 往左移的原理一样，若图片已是第一张，先以不带动画的方式移动到最后一张（图片与第一张相同）；

```js
arrowEls[0].onclick = function () { // 向右移
    if (curIdx >= liEls.length - 1) { // 到了形式上的最后一张（与第一张相同的图片）
        curIdx = 0; // 重置图片索引为第一张
        ulEl.style.marginLeft = 0 + 'px'; // 将 UL 移回第一张的位置
    }
    curIdx++;
    moveElm(ulEl, -(imgWidth * curIdx));
};


arrowEls[1].onclick = function () { // 向左移
    if (curIdx <= 0) { // 到了第一张图片
        curIdx = liEls.length - 1; // 重置图片索引为最后一张（与第一张图片一样）
        ulEl.style.marginLeft = -(imgWidth * curIdx) + 'px'; // 移到最后一张
    }
    curIdx--;
    moveElm(ulEl, -(imgWidth * curIdx));
};
```

