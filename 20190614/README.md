# 可拖拽的弹出登录窗口 - 带蒙板效果

#### 知识点整理：

* 在 html 代码中，导航条 div 写在前面、蒙板 div 写在后面并设置宽高为 100%，`<html>` 和 `<body>` 的宽高也设为 100%，如此在蒙板 `display: block;` 的时候就能盖住整个页面，使得导航条上的链接无法点击；

* 弹出窗口的关闭按钮通过设置两个 `<span>` 的 `transform: rotate(-45/45deg);` 达到 **X** 的效果；

* 拖动弹出窗口的效果，通过监测该窗口的 `onmousedown` 事件来触发；

  * 如果鼠标是点在关闭按钮上，就不做拖动的效果，但是关闭按钮由3个`<span>` 组成，要分别去监测的话比较麻烦，因此再在其上加了个小的蒙板，用于同一监测 `onmousedown` 是否点在关闭按钮的位置上；

    ```html
    <span class="close">
        <span></span>					 <!-- X 符号其中一笔 -->
        <span></span>					 <!-- X 符号其中一笔 -->
        <div class="x-sign-mask"></div>  <!-- 按钮最上层蒙板 -->
    </span>
    ```

    ```js
    let closeXsignEl = document.querySelector('.x-sign-mask');
    loginEl.onmousedown = function (event) {                
        if (event.target === closeXsignEl) { 
            return false; // 点到关闭按钮的蒙板上就不响应拖动事件
        }
        // ...
    }
    ```

* 关于 mouseEvent.pageX / pageY，这俩属性之前已经忘了什么作用了，查了 MDN 如下：

  > The pageX read-only property of the MouseEvent interface returns  the X (horizontal) coordinate (in pixels) at which the mouse was clicked, relative to the left edge of the entire document. 

  即：鼠标事件触发时，鼠标指针相对于整个页面（document）的位置；

  另：MDN 还说明了这两个属性仅用于鼠标事件，其它 UI 事件曾经也有这两个属性、但已经弃用；

* 窗口移动距离的计算方法：

  * 在 `onmousedown` 触发之后，先计算出鼠标位置相对于弹出窗口边框的距离，这个距离在 `onmouseup` 之前是固定的：

    ```js
    let x = event.pageX - loginEl.offsetLeft; // 鼠标相对于 loginEl 窗口的偏移量
    let y = event.pageY - loginEl.offsetTop;
    ```

  * 补充一下 `offsetLeft` 的说明：

    > ###### elm.offsetLeft & elm.offsetTop
    >
    > - 获取该元素到第一个开启了定位属性的祖先元素的偏移量；
    > - 若祖先元素均未开启定位，则获取该元素到 body 的偏移量；
    > - 区别于 elm.style.marginLeft/Top，这个margin属性获取的均为到 body 的偏移量；

  * 在 `onmousedown` 的事件代码中，嵌套 `onmousemove` 事件来处理弹出窗口随鼠标移动的效果；

    * 需要留意的是，如果把 `onmousemove` 事件绑定在弹出窗口上的话，在快速拖动窗口时，鼠标有可能会飘离窗口、导致事件失效，因此要把事件绑定到 `document` 对象上；
    * 在 `onmousemove` 事件中获取鼠标位置 `event.pageX/Y` ，减去鼠标相对于弹出窗口左上角的偏移量之后得出的值，就是弹出窗口的新位置，通过 `elm.style.left/top` 设置一下即可实现窗口移动；

    ```js
    document.onmousemove = function (event) {
        let offsetX = event.pageX - x;
        let offsetY = event.pageY - y;
        loginEl.style.left = offsetX + 'px';
        loginEl.style.top = offsetY + 'px';
    }
    ```

  * 在 `onmouseup` 事件中清除 `onmousemove` 事件，即可实现停止拖动窗口的效果；

    ```js
    loginEl.onmouseup = function () {
        document.onmousemove = null; // 清除鼠标移动事件
    };
    ```

    

