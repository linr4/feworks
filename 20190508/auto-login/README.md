# 自动登录网站

* 实现方法：
  * 在自己的网页中先预先填好登录所需的用户名/密码等信息（these info are hard coded in the doc as it's an internal use website and no security concerns）；
  * 表单中的 input 标签的属性需与目标网站一致，否则对方校验数据时可能会无法通过；
  * 设置了倒计时让用户有机会取消自动登录，方便用户以其它用户名和密码登录；

* HTML 表单

  ```html
  <form action="https://website.com/login.action" method="post">
    <input type="text" id="userName" name="userName" value="admin" >
    <input type="password" name="password" value="password" >
    <input type="text" name="project" value="prjName" >
    <input type="submit" value="Login">
  </form>
  ```

* JS 操作逻辑

  ```js
  window.onload = function () {
    let submitBtn = document.querySelector('input[type=submit]');
    let bannerEl = document.querySelector('.banner');
      
    let sec = 2;	// 倒计时秒数，因计时器也要等一秒钟后才开始，等3秒的话，这里要设成2
    let timerId = setInterval(function () {
      bannerEl.innerHTML = `<i>${sec}</i> 秒钟后开始自动登录，按 ESC 取消`;
      sec--;
        
      if (0 === sec) {	// 倒计时完，用户未取消，开始自动登录
          clearInterval(timerId);
          submitBtn.click();	// 触发登录按钮的点击事件、提交表单数据
      }}, 1000);
      
    document.onkeydown = function (ev) {
      if (ev.key === 'Escape') {	// 按 ESC 取消自动登录
        clearInterval(timerId);
        bannerEl.innerHTML = '您取消了自动登录';
      }
    }
  }
  ```

  