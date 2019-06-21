# 橱窗展示效果 - 水平滚动

### HTML 结构

* 图片列表和滚动条放在一个大盒子里，以便统一布局
* 滚动条要套一个父盒子，方便做定位以实现滚动效果

```html
<div class="box">
    <ul>
        <li><img src="images/1.jpg"></li>
		...
        <li><img src="images/9.jpg"></li>
    </ul>
    <div class="scroll-bar-wrapper">
        <div class="scroll-bar"></div>
    </div>
</div>
```



### CSS 知识点

* 发现只要开启了相对定位，就可以设置 left/top 等来实现元素移动效果，无需子绝父相；

* `ul` 设置了 `display: flex;` 之后，`li` 就可以实现水平排列的效果了，相对于设置浮动要简洁；

  

### JS 知识点

* 由于图片大小不一，因此图片列表的总宽度通过 `for` 循环把他们逐一相加得出；`margin` 不包含在 `offsetX`、`clientX` 或 `scrollX` 任何一种属性中，因此如果有 `margin` 就需要另外加进去；

  ```js
  for (let i = 0; i < liEls.length; i++) {
      imgsWidth += liEls[i].offsetWidth + 
          		 parseInt(getComputedStyle(liEls[i]).marginLeft) + 
          		 parseInt(getComputedStyle(liEls[i]).marginRight);
              }
  ```

* 滚动条的长度的计算：

  ```js
  // ∵ 滚动条长度 ÷ 盒子长度 = 盒子长度 ÷ 图片列表长度
  // ∴ 滚动条长度 = 盒子长度 ÷ 图片列表长度 × 盒子长度
  
  sbarEl.style.width = (boxWidth / imgsWidth) * boxWidth + 'px';
  ```

* 图片列表滚动距离的计算：

  ```js
  // 图片列表最大移动距离 = 图片列表宽度 - 盒子宽度
  let imgsMaxMove = imgsWidth - boxWidth;
  
  // ∵ 滚动条当前位置 ÷ 滚动条最大移动距离 = 图片列表当前位置 ÷ 图片列表最大移动距离
  // ∴ 图片列表当前位置 = 滚动条当前位置 ÷ 滚动条最大移动距离 × 图片列表最大移动距离
  let imgsLeft = sbarLeft / sbarMaxMove * imgsMaxMove;
  
  imgUlEl.style.left = -imgsLeft + 'px'; // 相对于滚动条反向移动，因此用负值
  ```

* 鼠标点击和拖动的事件的监听

  * 把监听对象放在 `document` 上，再判断点击`onmousedown`和移动`onmousemove` 触发位置是否在滚动条上，以确定是否响应；特别是 `onmousemove` 事件，若监听的是滚动条的该事件，当拖动过程中鼠标偏离滚动条时，事件会停止响应，处理滚动条移动的代码就不执行，虽然鼠标仍然按着、滚动条却不动了，不太符合常人的操作习惯；

  ```js
  document.onmousedown = function (event) {
      if (event.target !== sbarEl) { 
          return false;  // 点击位置不在滚动条上，则不响应
      }
      let mousePosX = event.pageX; 
      let sbarPosX = sbarEl.offsetLeft - boxEl.offsetLeft; // 滚动条当前位置
      let sbarMaxMove = boxEl.offsetWidth - sbarEl.offsetWidth; // 最大滚动距离
  
      document.onmousemove = function (event) {
          let mouseNewPosX = event.pageX; 
          let sbarLeft = mouseNewPosX - mousePosX + sbarPosX;
          // 滚动条位置 = 鼠标新位置 - 鼠标原位置 + 滚动条原位置
  
          // 边界检查
          sbarLeft = sbarLeft < 0 ? 0 : sbarLeft; // 最小
          sbarLeft = sbarLeft > sbarMaxMove ? sbarMaxMove : sbarLeft; // 最大
  
          // 设定滚动条新位置
          sbarEl.style.left = sbarLeft + 'px';
  
          // 图片列表最大移动距离 = 图片列表宽度 - 盒子宽度
          let imgsMaxMove = imgsWidth - boxWidth;
  
          // 图片列表当前位置 = 滚动条当前位置 ÷ 滚动条最大移动距离 × 图片列表最大移动距离
          let imgsLeft = sbarLeft / sbarMaxMove * imgsMaxMove;
          
          // 设定图片列表新位置
          ulEl.style.left = -imgsLeft + 'px';
      };
  };
  
  // 鼠标松开，释放移动事件
  document.onmouseup = function () {
      document.onmousemove = null;
  }
  ```

  