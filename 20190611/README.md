# 综合练习 - 星空背景

###### 知识点：

* 在文档中插入 `<span>` 标签并设置其背景为星星图片；

* 星星图片较大的话，可以设置 `<span>` 的宽高来调整大小，但需设置图片背景大小的属性：`background-size: 100% 100%;` 以让图片根据父元素进行缩放；

* 星星闪烁效果通过设置`<span>` 的 CSS 属性：`aninamtion: flash 1s alternate infinite;` 实现：

  ```css
  span {
      /* 仅呈现动画相关属性，其它属性省略 */  
      animation: flash 1s alternate infinite;
      /*
      	animation-name: flash
      	animation-duration: 1s
      	animation-iteration-count: infinite
      	animation-direction: alternate // 往复
      */
  }
  
  /* 动画的具体行为在 @keyframes 中定义，通过名字 flash 关联到<span>元素的 animation 属性中 */
  @keyframes flash {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }
  ```

* 鼠标悬停在星星上出现旋转放大的效果，通过设置其 `transform` 属性实现：

  ```css
  span:hover {
    transform: rotate(180deg) scale(3, 3) !important;
    transition: all 1s;
  }
  /*
  注释：
  1) rotate(180deg)：旋转180度；
  2) scale(3, 3)：横轴、纵轴均放大3倍；
  3) !important：在后续的JS代码中也通过 transform: scale(); 设置了星星随机大小，因此需要在 CSS 代码部分加上 !important 使得这段样式代码能够生效、不被覆盖；
  4) transtion: all 1s; 所有过渡效果在一秒内完成；
  */
  ```

  

###### JavaScript 代码

* 星星的位置、大小，以及闪烁频率，均通过 random() 函数使其在一定范围内随机；

```js
// 获取页面宽高的函数，采用兼容写法：

function getPageWH() { 
    var width, height; // 使用 var 来声明变量以兼容老旧浏览器
    if (window.innerWidth) {	// 现代浏览器支持使用 window.innerWidth 获取页面宽度
        width = window.innerWidth;
        height = window.innerHeight;
    } else if (document.compatMode === 'CSS1Compat') { // IE9 以下，标准模式
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else { // IE9 以下，混杂模式
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    return {width, height}
}

// 向页面中添加200个星星 <span> 元素

for (let i = 0; i < 200; i++) {

    let starEl = document.createElement('span');
    document.body.appendChild(starEl);    // create a star and append to body

    // 随机位置
    starEl.style.left = Math.random() * getPageWH().width + 'px'; // set pos of a star
    starEl.style.top = Math.random() * getPageWH().height + 'px';

    // 随机闪烁
    starEl.style.animationDelay = Math.random() * 2 + 's'; // make stars flash randomly

    // 随机大小
    let scale = Math.random() * 2;
    starEl.style.transform = `scale(${scale}, ${scale})`; // adjust stars' size randomly
}
```

