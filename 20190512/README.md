# 列表的全选、反选和取消选择

#### 知识点：

* CSS - 盒子的阴影用 `box-shadow` 属性

  ```css
  /* offset-x | offset-y | color */
  box-shadow: 60px -16px teal;
  
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 10px 5px 5px black;
  
  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  
  /* inset | offset-x | offset-y | color */
  box-shadow: inset 5em 1em gold;
  
  /* Any number of shadows, separated by commas */
  box-shadow: 3px 3px red, -1em 0 0.4em olive;
  ```

* JS - 设置多选框为选中状态，只需设置 DOM 对象的 checked 属性为 true 即可

  ```js
  selectAllEl.onclick = function () {
      songListEls.forEach(function (chkbox, index, nodeList) {
          chkbox.checked = true;
      })
  };
  
  selectCancelEl.onclick = function () {
      songListEls.forEach(function (chkbox) {
          chkbox.checked = false;
      })
  };
  
  selectReverseEl.onclick = function () {
      songListEls.forEach(function (chkbox) {
          chkbox.checked = !chkbox.checked;
      })
  }
  ```

  