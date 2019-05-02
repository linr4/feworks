### 实现逻辑

* 定义精灵类

  * 创建 DOM 元素 div > span，设置背景为精灵图片，子元素 span 设置随机字母，将 div 添加到 body 中
  * 定义方法 floatSpec()，在定时器中调整 top 值，实现向上浮动的效果
  * 定义方法 removeSpec() ，超出上边界或按中精灵的字母时，清除定时器、删除 div、删除实例对象

* play 图片按钮点击事件

  * 设置定时器，定时创建精灵类的实例对象，调用方法floatSpec() 使其浮动起来
  * 更新存储精灵实例对象的数组，方便后续处理按键事件

* 处理按键事件

  * 检查输入按键是否为字母

  * 遍历精灵数组，查找页面上有无该字母的精灵

  * 调用 removeSpec() 方法删除精灵，并从数组中删除该精灵对象

    

### 涉及知识点

* 让背景图片铺满可视区域： 

  ```css
  html, body {
      width: 100%;
      height: 100%; /* 高度若没有设置的话，图片会显示不全 */  
  }
  body {
      background: url('bg.jpg') center center no-repeat;
  	background-size: cover; /* 没有设置这一项的话，无法铺满 */
  }
  ```

  

* Play 图片按钮在页面中居中显示：

  ```css
  .play-btn {
      position: absolute;
      top: 50%;	/* 父元素宽高的 50% */
      left: 50%;
      transform: translate(-50%, -50%); /* 移动元素自身宽高的 -50% */
  }
  ```



* 随机生成一个字母：

  ```js
  let letter = String.fromCharCode(Math.round(Math.random() * 25) + 65);
  
  // String.fromCarCode()：将数字按 keyCode 编码转成字符，[A-Z] = [65-95]
  // Math.round(Math.random() * 25) + 65：生成一个 65~90 的随机数字
  
  // MDN 上生成一个min/max之间的随机数的示例如下，我改造了一下：
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    //The maximum is inclusive and the minimum is inclusive 
  }
  ```



* 获取页面可见区域的宽高：

  ```js
  let page_visible_width = document.documentElement.clientWidth + 'px';
  let page_visible_height = document.documentElement.clientHeight + 'px';
  ```



* 在 JS 中获取样式属性：

  ```js
  let divEl = document.querySelector('div');
  
  // 获取写在标签上的行内 CSS 属性
  let divTop = divEl.style.top;
  
  // 内嵌或外链 CSS 属性，需要通过 getComputedStyle() 全局方法获取： 
  let divTop = parseInt(window.getComputedStyle(divEl).top);
  ```

  

* 通过父元素删除子元素：

  ```js
  divEl.parentNode.removeChild(divEl);
  ```



* 判断指定字符是否为字母：

  ```js
  /^[A-Z]$/i.test(char);
  
  // 正则表达式：/^ 开始，$/结束，[A-Z] 任意字母，/i忽略大小写，返回 true 或 false；
  ```

  

* 数组遍历和删除元素：

  ```js
  // forEach() 回调函数默认有三个形式参数可用：
  array.forEach(function(currentElement, currentIndex, currentArray));
  
  array.splice(fromIndex, 要删除的元素个数);
  ```

  