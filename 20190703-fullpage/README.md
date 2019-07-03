# FullPage.js

* 是什么？是一个基于 jQuery 的插件，用于制作全屏滚动的网站；

* [使用方法](https://github.com/alvarotrigo/fullpage.js)：

  * HTML 中引入 fullpage.css、jQuery.js、(easings.js、scrolloverflow.js)、fullpage.js

    ```html
    <link rel="stylesheet" type="text/css" href="fullpage.css" />
    
    <!-- This following line is optional. Only necessary if you use the option css3:false and you want to use other easing effects rather than "easeInOutCubic". -->
    <script src="vendors/easings.min.js"></script>
    
    
    <!-- This following line is only necessary in the case of using the option `scrollOverflow:true` -->
    <script type="text/javascript" src="vendors/scrolloverflow.min.js"></script>
    
    <script type="text/javascript" src="fullpage.js"></script>
    ```

  * 按要求的 HTML 结构编写代码

    ```html
    <div id="fullpage">
    	<div class="section">Some section</div>
    	<div class="section">Some section</div>
    	<div class="section">Some section</div>
    	<div class="section">Some section</div>
    </div>
    ```

  * 初始化

    ```js
    new fullpage('#fullpage', {
    	//options here
    	autoScrolling:true,
    	scrollHorizontally: true
    });
    
    //methods
    fullpage_api.setAllowScrolling(false);
    ```

  

* 常用属性、函数、方法

  ```js
  new fullpage('#fullpage', {
      autoScrolling: true,
      scrollHorizontally: true,
      sectionsColor: ['turquoise', 'orangered', 'skyblue', 'seagreen'],
      navigation: true,	// 标识当前页面的小圆点，默认在右边中间
      navigationTooltips: ['page 1', 'page 2', 'page 3', 'page 4'], // 小圆点的气泡提示
      showActiveTooltip: true, 	// 气泡提示常显
      navigationPosition: 'left', // 把小圆点挪到页面左边
      // loopBottom: true,		// 页面到底部后循环滚动（会显示从最后一页滚到第一页的过程）
      // loopTop: true,
      
      continuousVertical: true,	// 到最后一个页面在往下就直接滚动到第一页，不显示回滚的过程
  
      onLeave: function (origin, destination, direction) { // 页面滚动之前
          console.log('on leave:', origin, destination, direction)
      },
  
      afterLoad: function (origin, destination, direction) { // 页面滚动完成后
          console.log('after load:', origin, destination, direction)
      }
  });
  
  fullpage_api.setAllowScrolling(true); // fullpage_api 为全局对象
  
  
  // 常用方法
  
  $('#prev').click(function () {
      fullpage_api.moveSectionUp();	// 向上滚动一页
  });
  
  $('#next').click(function () {
      fullpage_api.moveSectionDown(); // 向下滚动一页
  });
  
  let inputEl = document.querySelector('input');
  
  $('#goto').click(function () {		// 滚动到指定页
      fullpage_api.moveTo(inputEl.value);
      console.log('move to', inputEl.value);
  });
  
  $('#curr').click(function () {		// 返回当前页面
      console.log(fullpage_api.getActiveSection());
  })
  ```

  

* 自定义菜单

  ```html
  <ul id="myMenu">
  	<li data-menuanchor="firstPage" class="active"><a href="#firstPage">First section</a></li>
  	<li data-menuanchor="secondPage"><a href="#secondPage">Second section</a></li>
  	<li data-menuanchor="thirdPage"><a href="#thirdPage">Third section</a></li>
  	<li data-menuanchor="fourthPage"><a href="#fourthPage">Fourth section</a></li>
  </ul>
  ```

  ```js
  new fullpage('#fullpage', {
  	anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
  	menu: '#myMenu'
  });
  ```

  

