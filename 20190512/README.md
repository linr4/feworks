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

* JS - 设置多选框为选中状态，只需设置 多选框的 checked 属性为 true 即可

  
  
  * 第一种实现：监听按钮点击事件，逐个设置多选框状态
  
  ```js
  let songListEls = document.querySelectorAll('#billboard input');
  let selectAllEl = document.querySelector('#select_all');
  let selectCancelEl = document.querySelector('#select_cancel');
  let selectReverseEl = document.querySelector('#select_reverse');
  
  selectAllEl.onclick = function () {
      songListEls.forEach(function (chkbox) {
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
  
  * 第二种实现
  
  ```js
  let songEls = document.querySelectorAll('input[type=checkbox]');
  let btnsEls = document.querySelectorAll('button');
  
  songEls.forEach(function (song) {
      btnsEls.forEach(function (btn) {
          btn.addEventListener('click', function () {
              switch (btn.className) {
                  case 'select-all':
                      song.checked = true;
                      break;
                  case 'select-can':
                      song.checked = false;
                      break;
                  case 'select-rev':
                      song.checked = !song.checked;
                      break;
                  default:
                      break;
              }
          })
      })
  })
  ```
  
* 第三种实现：抽离出设置多选框状态的函数（高内聚、低耦合？）

  ```js
  let songEls = document.querySelectorAll('input[type=checkbox]');
  let btnEls = document.querySelectorAll('button');
  
  btnEls[0].onclick = function () {
      doSelection('true');
  };
  
  btnEls[1].onclick = function () {
      doSelection('false');
  };
  
  btnEls[2].onclick = function () {
      doSelection('!song.checked')
  };
  
  function doSelection(state) {
      songEls.forEach(function (song) {
          song.checked = eval(state);
      })
  }
  ```

  看了 MDN 上关于 [eval()](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval>) 的说明，不建议用，有安全和性能的问题；可以用 `Function()` 代替。

