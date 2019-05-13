# 秒杀倒计时



#### 知识点：

* 【CSS】时间数字中间显示一条横线，是通过加上伪元素 ::before 实现的；

    注意：颜色是设置在 background-color 上的，设置在 color 上会显示不出来；

  ```css
  .time>div::before {
      content:"";
      display: block;
      width: 100%;
      height: 2px;
      background-color: red; /* <----- */
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
  }
  ```

  

* 闪电用的是字体图标，可到 [iconfont](http://www.iconfont.cn)、[font awesome](https://fontawesome.com) 等网站下载，在本地引入即可；

  ```css
  <link rel="stylesheet" href="iconfont/iconfont.css">
  
  // CSS
  .wrapper>i {
      display: inline-block;
      font-size: 36px;
      margin: 10px;
  }
  
  // HTML
   <i class="iconfont icon-flash"></i>
  ```

  

* 用于显示时分秒的三个 div 使用弹性布局：

  ```css
  // CSS
  .wrapper>.time {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      margin-top: 10px;
  }
  
  // HTML
  <div class="time">
  	<div class="hour">  00</div>
  	<div class="minute">00</div>
  	<div class="second">00</div>
  </div>
  ```

  

* JS 模块

  * 获取两个时间点差值 `getDiff()`
  * 设置时间到 DOM 元素 `setTime()`
  * 定时器每秒调用一次 `setTime()`

  ```js
  let hourEl = document.querySelector('.hour');
  let minuteEl = document.querySelector('.minute');
  let secondEl = document.querySelector('.second');
  let tgtDate = new Date('2019-05-15 22:00:00');
  
  // 一开始就要先执行一次设置时间，否则刚打开页面时显示为 00:00:00 体验不好
  setTime(hourEl, minuteEl, secondEl);	
  
  // 每秒钟刷新显示一次时间
  let timerId = setInterval(function () {
      setTime(hourEl, minuteEl, secondEl);
  }, 1000);
  
  // 为了一打开页面就能先设置一次时间，就把设置时间的代码从定时器中抽出来
  function setTime(hh, mm, ss) {
      let diff = getDiff(tgtDate); // 获取当前时间与目标时间的差值
      hh.innerText = diff.hours;	 // 把时间差值显示到相应DOM元素上
      mm.innerText = diff.minutes;
      ss.innerText = diff.seconds;
  }
  
  // add leading zero, 小于10的数字加前置0
  function alz(n) {  
      n = n.toString();
      return n[1] ? n : '0' + n;	// 判断是否存在下标为1的字符（即：传入的形参为两位数）
      /* 也可以写成：
      return n >= 10 ? n : '0' + n;
      */
  }
  
  // 获取两个时间点的差值
  function getDiff(tgtDate, curDate = new Date()) {
      let diffMs = tgtDate - curDate; // differential in milliseconds
      let aSecond = 1000, // a second = 1000 milliseconds
          aMinute = 60 * aSecond,
          anHour = 60 * aMinute,
          aDay = 24 * anHour;
  
      let days = alz(Math.floor(diffMs / aDay)),
          hours = alz(Math.floor(diffMs % aDay / anHour)),
          minutes = alz(Math.floor(diffMs % anHour / aMinute)),
          seconds = alz(Math.floor(diffMs % aMinute / aSecond));
      
      return {
          days,	// 等价于 days: days, 当 key 与 value 同名时可以简写
          hours,
          minutes,
          seconds
      }
  }
  ```

  