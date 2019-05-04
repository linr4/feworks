### 关闭浮动广告

* 浮动效果通过设置包裹 div 的定位来实现：

  ```css
  .container {
      position: fixed;
      left: 1px;
      bottom: 1px;
  }
  ```

* 关闭按钮图片与广告图片都放在包裹的 div 里，也是通过定位放到右上角，留意 top 是负值：

  ```css
  .close {
      position: absolute;
      top: -17px;
      right: 0;
      cursor: pointer;
  }
  ```

* 关闭广告的效果是通过删除包裹 div 元素实现：

  ```js
  closeEl.onclick = function () {
    containerEl.parentNode.removeChild(containerEl);
  }
  ```

  

### 广告图片展示和切换

* 监听图片点击事件，将大图切换为小图的图源；
* 将切换图源的函数放在给小图绑定点击事件的循环外面，如此，所有小图点击事件都执行同一个函数；如果放在循环内，则每个小图都要创建一个相同代码的函数实例，不够优化；

```js
let bImgEl = document.querySelector('div>img');
let sImgEls = document.querySelectorAll('li>img');

for (let img of sImgEls) {
    img.onclick = changeImg;
}

function changeImg() {
  bImgEl.src = this.src;
}
```

