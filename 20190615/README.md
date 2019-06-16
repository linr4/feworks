# 小图、大图 - 放大镜效果

* html 结构比较简单：小图、大图，再加一个蒙板；

  ```html
  <div class="wrapper">
    <div class="img-sml"></div>
    <span class="img-msk"></span>
    <div class="img-big"></div>
  </div>
  ```

* 图片采用在 css 中设置 <div> 背景图片的方式，也可以在 html 中嵌入 <img> 的方式；

  ```css
  .img-small {
    width: 518px;
    height: 345px;
    background: url("lion.jpg") no-repeat;
    background-size: 100% 100%;
    /* 这里的百分比是指背景图片大小为 div 的百分之多少，可大可小 */
  }
  ```

* 大图和蒙板的显示/隐藏通过小图的 onmouseover 事件来控制；

  留意一下：

  * 鼠标在蒙板上的时候，如果不设置蒙板的onmouseover 事件的话，会出现蒙板频繁闪烁的现象；
  * 小图和蒙板的同类型事件，可以用**连续赋值**的方式，以使代码简洁；

  ```js
  // 鼠标进入小图，显示蒙板和大图
  smlImgEl.onmouseover = imgMskEl.onmouseover = ()=> {
    bigImgEl.style.display = imgMskEl.style.display = 'block';
  };
  
  // 鼠标离开小图，隐藏蒙板和大图
  smlImgEl.onmouseleave = imgMskEl.onmouseleave = ()=> {
    bigImgEl.style.display = imgMskEl.style.display = 'none';
  };
  ```

* 控制蒙板移动和大图随动的代码，看注释：

  ```js
  // 使蒙板跟随鼠标移动到新位置，并显示大图相应位置（放大镜的效果）
  smlImgEl.onmousemove = imgMskEl.onmousemove = function (event) {
  
    // 计算蒙板的新位置：鼠标位置 - 盒子左/上边距 - 蒙板宽/高的一半
    let maskX = event.pageX - imgWrpEl.offsetLeft - imgMskEl.offsetWidth/2;
    let maskY = event.pageY - imgWrpEl.offsetTop - imgMskEl.offsetHeight/2;
  
    // 设置蒙板的移动边界，限定在小图的边框之内
    maskX = maskX < 0 ? 0 : maskX; // 最小左边界 0
    maskY = maskY < 0 ? 0 : maskY; // 最小上边界 0
  
    // 最大右边界：小图宽度 - 蒙板宽度
    let rightMost = smlImgEl.offsetWidth - imgMskEl.offsetWidth;
    // 最大下边界：小图高度 - 蒙板高度
    let bottomMost = smlImgEl.offsetHeight - imgMskEl.offsetHeight;
  
    maskX = maskX > rightMost ? rightMost : maskX;
    maskY = maskY > bottomMost? bottomMost: maskY;
  
    imgMskEl.style.left = maskX + 'px';
    imgMskEl.style.top  = maskY + 'px';
  
    // 大图移动距离的计算公式：
    // 蒙板移动距离 / 蒙板最大移动距离 = 大图移动距离 / 大图移动最大距离
    // 即：大图移动距离 = 蒙板移动的距离 / 蒙板最大移动距离 * 大图移动最大距离
  
    let bigImgX = -maskX / rightMost  * bigImgEl.offsetWidth  * 4;
    let bigImgY = -maskY / bottomMost * bigImgEl.offsetHeight * 4;
  
    bigImgEl.style.backgroundPositionX = bigImgX + 'px';
    bigImgEl.style.backgroundPositionY = bigImgY + 'px';
  }
  ```

  