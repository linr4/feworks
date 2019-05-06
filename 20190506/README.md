### [鼠标移入移出菜单](mouse-hover-menu)



#### 知识点

* 文档结构

  ```js
  <div class="wrapper">	 <!-- 大div包裹了二维码和图标 -->
      <div class="qrcode"> <!-- 二维码 div -->
          <p>Wechat QR Code</p>
  		<img src="qrcode.jpg">
      </div>
  	<ul>  <!-- 字体图标列表 -->
      	<li><i class="fa fa-qq"></i></li>	  <!-- font awesome 字体图标 -->
      	<li><i class="fa fa-wechat"></i></li> 
      	<li><i class="fa fa-envelope"></i></li>
  	</ul> 
  
  <!-- FA CSS里面用 :before 来显示字体，因此要包一个 i 标签，若设在li上，则字体大小等设置不生效 -->
  
  </div>
  ```

* 样式

  * font-awesome 字体图标的引入和使用：

    ```html
    <link rel="stylesheet" href="fa/css/font-awesome.min.css">
    <i class="fa fa-qq">
    ```

  * 菜单列表的定位：

    ```css
    .wrapper {
        position: fixed;  /*固定定位使得菜单不会随网页滚动*/
        top: 50%; /*配合transform做居中，top为父标签的高度50% */
        right: 1px;
        transform: translateY(-50%); /*元素本身的50%，负值为反方向移动*/
    }
    ```

* 动态效果的实现：

  * 监听菜单项的 `onmouseenter`和`onmouseleave`事件，进出时分别切换二维码div的style.display为block/none；或切换设置透明度opacity亦可；CSS 设置`transition: all 0.3s` 可加上过渡效果；

    ```js
    wechatEl.onmouseenter = _=> {
        qrcodeEl.style.opacity = '1';
    }
    wechatEl.onmouseleave = _=> {
        qrcodeEl.style.opacity = '0';
    }
    ```

  * 初学者建议先用 `onmouseenter`和`onmouseleave`事件，暂不使用`onmouseover`和`onmouseout`；





### [商品展示橱窗效果](commodities-showcase)



#### 知识点：

* 下方小图用弹性布局：

  ```css
  ul {
        list-style-type: none;
        display: flex;
        justify-content: space-between;
      }
      li>img {
        width: 80px;
        height: 80px;
        border: 2px solid transparent; /*预占边框位置、设为透明，在后续加边框高亮时才不会有位移*/
      }
  ```

* 小图加高亮边框的效果，才有添加一个预设的CSS类来实现：

  ```css
  .current {
      border: 2px solid skyblue;
  }
  ```

  当鼠标移入时，动态添加这个CSS类，并设置大图图源为小图、实现切换；鼠标移开时移除边框CSS类、去除高亮效果，但图源不变：

  ```js
  img.onmouseenter = function() {
      this.classList.add('current');
      bigImgEl.src = this.src; 
  }
  img.onmouseleave = function() {
      this.classList.remove('current')
  }
  ```

  

