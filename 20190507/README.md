# 表单相关知识点

### [表单校验](form-validation)

* 作用：输入的用户名/密码信息少于6个字符时，输入框变为红色，表单不提交；

* 实现：监听按钮点击事件，判断输入框 value 长度，小于6就设置输入框背景颜色，并 `return false` 使得 `submit` 按钮不会继续执行表单提交动作；

  ```js
  submitEl.onclick = function () {
      if (userEl.value.length < 6) {
          userEl.classList.add('warning');
          return false; // 如此就不会继续执行提交表单的动作
      } else {
          userEl.classList.remove('warning');
      }
  }
  
  // 补充知识点：
  // querySelector 获取元素时，可以用与CSS一样格式的属性选择器：
  let userEl = document.querySelector('input[type=text]');
  
  ```



### [input 相关事件](input-events)

* 留意 `onchange`与`oninput`的区别

* IE9 及之前的版本不支持 `oninput`，可用`onpropertychange`代替；

  ```js
  let inputEl = document.getElementsByTagName('input')[0];
  
  inputEl.onfocus = function () {
      console.log('獲取到了焦點');
  };
  
  inputEl.onblur = function () {
      console.log('失去了焦點');
  };
  
  inputEl.onchange = function () {
      console.log(`內容改變了：${inputEl.value}，但只有失去焦點時才會觸發此事件`);
  };
  
  inputEl.oninput = function () {
      console.log(`內容改變了：${inputEl.value}，內容有變化時會實時觸發此事件`);
  }
  ```

  

### [按钮状态与输入框联动](input-events/search-btn-disable.html)

* 目的：根据输入框有无内容启用/禁用按钮；

* 实现：在输入框`oninput`事件中判断输入框内容的长度，据此设置按钮的 disabled 属性；

* 注意点：通过代码设置输入框的值不会触发`oninput`事件；

  ```js
  let inputEl = document.querySelector('input[type=text]');
  let submitEl = document.querySelector('input[type=submit]');
  submitEl.disabled = true;
  inputEl.oninput = function () {
      submitEl.disabled = inputEl.value.length === 0;
  };
  inputEl.value = 'some keywords'; // 按钮此时不会启用
  ```

  