# 长图滚动



* 实现方法：上下滚动的长图，监听鼠标进入/离开事件，在进入的事件中通过定时器设置图片位置的 top 值实现滚动效果；左右滚动的长图则类似，动态设置 left 值；
* 知识点：
  * 鼠标悬停触发图片滚动的效果，需要在图片的上下部分分别设置两块蒙版 div，用于监听蒙版的鼠标进入/离开事件，从而确定滚动方向；左右滚动的图片则设置左右两块蒙版；
  * 图片位置的 top 值范围为 0 到 最大滚动距离 = 图片高度 - 外框高度；
* 图片若有进行缩放，需留意宽高等比，缩放后 get 到的实际 px 值与图片原片的宽高不同；
  
* 可以把滚动的控制代码抽离出来、使得上下（或左右）滚动使用同一个函数，如下为控制左右滚动的代码：

  ```js
  // 图片最大的左右移动距离 = 图片宽度 - 外框div宽度
  let maxOffset = parseInt(getComputedStyle(imgEl).width) -
      			parseInt(getComputedStyle(boxEl).width);
  
  
  function moveImg(direction) {
  
        // 设定移动方向
        let sign = null;	// positive-negative sign，用于设定图片 left 值的递增或递减
        if ('right' === direction) {sign = -1;} else
        if ('left' === direction) {sign = 1;} else {
            return false; // 传入的参数不是 left或right，图片就不做移动
        }
  
        let imgLeft = parseInt(getComputedStyle(imgEl).left); // 图片当前位置
        // 图片移动的起始位置需要基于它当前所在的位置
  
        // 开启定时器、开始移动图片
        timerId = setInterval(function () {
          if (imgLeft > 0 || imgLeft < -maxOffset) { // 图片超出最大移动范围
            clearInterval(timerId);  // 停止定时器
            return false;	// 退出
          }
          imgEl.style.left = imgLeft + 'px'; // 移动图片
          imgLeft = pnSign * 10 + imgLeft;      // 移动增量，pnSign 确定移动方向
        }, 10)
      }
  
      mLeftEl.onmouseenter = function () {
        moveImg('right');
      };
  
      mRightEl.onmouseenter = function () {
        moveImg('left');
      };
  }
  ```

  