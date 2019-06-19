# 页面楼层效果

### 实现逻辑

* 当前可视区域的页面用 `ul>li` 定义，需要在 CSS 设置 `html, body, ul, li {width: 100%; height: 100%;}` ；
* 侧边菜单用 `ol>li` ，固定定位 `ol` 到指定位置；
* 定义菜单点击事件有两种方式，
  * 一是定义在 `ol` 上，再通过 `event.target` 判断是哪个 `ol>li` 被点击，缺点是需要在所有 `li` 标签上添加自定义索引属性，以便 `ol` 和 `ul` 两者的 `li` 的联动，且要通过 `onmousedown` 事件、用 `onclick` 会有些其它问题（下面详述）；优点是只需定义一个事件即可响应所有 `ol>li` 的点击；
  * 二是通过 `for` 循环定义到每个 `ol>li` 上，缺点是每个 `ol>li` 都需绑定一个 `onclick` 事件，优点是无需自定义索引，只需用到 `for` 循环的索引变量即可使 `ul` 和 `ol` 的 `li` 联动；
* 滚动效果的实现，是通过设置 `document.documentElement.scrollTop = window.innerHeight * i`，索引`i` 表示楼层，即窗口可视区域高度的倍数；也可通过 `window.scrollTop(x,y)` 方法来设置； 



### 知识点

* 缓动动画的定时器的 handler 变量 `timerId` 要定义在点击事件函数的外面，若定义在函数里面，则如果在前一次滚动未结束之前再次点击的话，程序会重新定义一个不同的`timerId`，导致`clearInterval`无法清除之前的`timerId`，结果是前一个定时器仍在运行，而后一个定时器也开始运行，多个定时器同时生效会使页面会抖动；

* 若用第一种方式在 `ol` 上定义点击事件，需要用 `mousedown`，如果用 `onclick` ，在鼠标按下并拖动的时候会导致所有 `ol>li` 被加上 .selected 的样式；

* 变量定义尽可能放到定时器外面，定时器中只做变量计算；

  ```js
  let timerId = null;  // 定义在函数的外面
  
  olEl.onmousedown = function (event) { // 用onclick的话，鼠标按下拖动会导致ol被加上class
      curLi.classList.remove('selected');
      event.target.classList.add('selected');
      curLi = event.target;
      curIdx = curLi.getAttribute('index');
  
      let curPos = window.pageYOffset; // curPos/tgtPos 要在定时器之外做定义
      let tgtPos = window.innerHeight * curIdx;
      let inc = 0;
  
      clearInterval(timerId);
      timerId = setInterval(() => {
          inc = (tgtPos - curPos) * .2;
          curPos += inc;
  
          if (Math.abs(inc) < 1) { // 
              curPos = tgtPos;
              clearInterval(timerId);
          }
          document.documentElement.scrollTop = curPos;
      }, 50);
  };
  ```

* 关于缓动动画：

  * 使用定时器的目的是让它在规定的时间内执行完；用 for 循环的话一下子就执行完了，看不到动画效果；

  * 计算公式：位移增量 =（目标位置 - 当前位置）* 系数 (小数，以实现几何级数递减)，

  * 公式中 `位移增量` 会随 `当前位置` 的递减而几何级数的递减，从而达到 start fast, end slowly （Ease Out） 的效果；

  * 判断定时器结束的条件要用 `位移增量` 的绝对值，如果用 `当前位置` 作为判断条件，当移动方向相反时逻辑就不对了：

    ```js
    if (curPos < 1)           // 当移动方向相反时这个表达式就无法达到预期了，判断 inc 会合适一点
    if (Math.abs(inc) < 1)    // 十分接近目标位置了就结束缓动过程
    ```

    



### **补充知识点**

###### **1)** `ScrollY` vs. `pageYOffset` ---- 尽量只用 `pageYOffset`

> [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)
>
> For cross-browser compatibility, use `window.pageYOffset` instead of `window.scrollY`. **Additionally**, older versions of Internet Explorer (< 9) do not support either property and must be worked around by checking other non-standard properties. A fully compatible example:
>
> ```js
> var supportPageOffset = window.pageXOffset !== undefined;
> var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
> 
> var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
> 
> var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
> ```
>
> 



###### **2)** [window.pageYOffset vs document.documentElement.scrollTop](https://stackoverflow.com/questions/22727751/window-pageyoffset-vs-document-documentelement-scrolltop)

> Both `window.pageYOffset` and `document.documentElement.scrollTop` returns the same result in all the cases.
>
> `window.pageYOffset` is not supported below IE 9.



> Apparently, `window.pageYOffset` is slower. A PR in claim: [github.com/w3c/respec/pull/1685](https://github.com/w3c/respec/pull/1685). Someone needs to create a jsperf for this.



> `document.documentElement.scrollTop` does NOT work with Safari nor Apple Products.
>
> `window.pageYOffset` does. They appeared to produce the same values.



###### **3)** [list-style-type vs. list-style](https://stackoverflow.com/questions/19889069/whats-the-difference-between-list-style-type-and-list-style)

The [`list-style`](http://www.w3.org/TR/CSS2/generate.html#propdef-list-style) property is a shorthand property that always sets three properties: `list-style-type`, `list-style-position`, and `list-style-image`. For example

```
list-style: square;
```

is equivalent to setting all of the following:

```
list-style-type: square;
list-style-position: outside;
list-style-image: none;
```

看了例子，通常设置在 `ul` / `ol` 上，而不是设在 `li` 上。