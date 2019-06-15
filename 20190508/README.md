# [选项卡](options-tab)

* 页面结构

  * 选项卡标题使用`ul>li`来实现；每页的内容用一页一个`div`来做；

  ```html
  <div class="wrapper">
      <ul class="tabs">
          <li class="cur-tab">tab01</li>
          <li>tab02</li>
          <li>tab03</li>
          <li>tab04</li>
          <li>tab05</li>
      </ul>
      <div class="contents">
          <div class="cur-div">contents of tab01</div>
          <div>contents of tab02</div>
          <div>contents of tab03</div>
          <div>contents of tab04</div>
          <div>contents of tab05</div>
      </div>
  </div>
  ```

  

* 页面样式注意点

  * `li` 标签的横排效果通过在`ul` 上设置弹性布局来实现；
  * 内容 `div` 初始设置 `display: none`，选中后再添加一个类，类中设置`display:block`；
  * 在 JS 中动态添加的样式类优先级较低，部分属性要在预设的样式类中加上 `!important`；

  ```css
  .tabs {
      list-style-type: none;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: flex;
      justify-content: space-between;
  }
  .contents>div{
      width: 100%;
      height: 100%;
      display: none;
  }
  .cur-tab {
      border-bottom: none !important;
      background-color: #cccccc;
      font-weight: bold;
  }
  .cur-div {
      display: block !important;
      background-color: #cccccc;
  }
  ```

  

* 逻辑控制

  * 需要设置一个变量保存当前选中的选项卡的索引值，如下 `let cur = 0; // current index`；
  * 通过 `for` 循环给各个 `li` 标签添加点击事件；
  * 在点击事件中根据索引给选项卡和内容 `div` 动态添加预设样式类、清除之前选中的卡的样式类；

  ```js
  let tabEls = document.querySelectorAll('li');
  let cntEls = document.querySelectorAll('.contents>div');
  let cur = 0;	// current index of active tab & content div
  for (let i = 0; i <= tabEls.length; i++) {
      tabEls[i].onclick = function () {
          if (i !== cur) { // 若所点击的选项卡不是当前已选中的选项卡
              tabEls[cur].classList.remove('cur-tab');
              this.classList.add('cur-tab');
              cntEls[cur].classList.remove('cur-div');
              cntEls[i].classList.add('cur-div');
              cur = i;
          }
      }
  }
  ```

  