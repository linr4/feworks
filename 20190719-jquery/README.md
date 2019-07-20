# jQuery

* 代码初始化（入口函数）的写法

  ```js
  // 1. 原生JS写法
  window.onload = function () {}
  
  // 2. JQuery写法
  	// 1) 第一种写法
  	$(document).ready(function(){})  // or
  	jQuery(document).ready(function(){})
  	
  	// 2) 第二种写法
      $(function(){})	// 推荐用这种写法；// or
  	jQuery(function(){})
  ```

  

* 入口函数加载模式的区别

  ```js
      // 1. JS
      window.onload = function (ev) {
          var imgEl = document.getElementsByTagName('img')[0];
          var imgWidth = getComputedStyle(imgEl).width;
          var imgHeight = getComputedStyle(imgEl).height;
          console.log(imgWidth, imgHeight); // 143 59
          // 原生JS可以拿到DOM宽高
      }
  
      // 2. JQ
      $(document).ready(function(){ // 比 windows.onload 先执行
          var $img = $('img');
          console.log($img.width()); // 0 for the 1st time (without cache)
          console.log($img.height()); // 0
          // JQ在第一次加载、没有缓存的情况下，无法拿到DOM宽高
      })
  ```

  * 原生JS的入口函数会等到所有DOM加载完毕再执行，包括图片；
  * jQuery入口函数会等待DOM加载完毕之后执行，但不会等图片加载完毕；

  ```js
  window.onload = function () {
    alert('hello 1'); 
  }
  window.onload = function () {
    alert('hello 2'); // 后写会覆盖先写，‘hello 1’ 所在的入口函数被覆盖、不执行
  }
  
  
  $(document).ready(function() {
    alert('jQuery 1');
  })
  $(document).ready(function() {
    alert('jQuery 2'); // 两个在不同入口函数中的 alert 都会执行，不会覆盖
  })
  ```

  * 原生JS若有多个入口函数，后写的会覆盖先写的，导致先写的入口函数不会执行；

  * jQuery中编写多个入口函数，不会相互覆盖，会按编写顺序执行；

    

* jQuery 解决引用符号$ 的冲突问题
  * 目的：释放`$` 符号的使用权，以避免与其它代码冲突

  * 方法：1) 放弃使用权；或 2) 自定义引用符号

  ```js
    // 释放 $ 符号的使用权、避免与其它代码关于 $ 的冲突；
    // 必须写在所有 jQuery 代码之前；
    // 释放后就只能用 jQuery 关键字、不能再用 $；
    jQuery.noConflict();
    
    // 也可自定义一个访问符号/关键字来代替 $；
    jq = jQuery.noConflict();
  ```



* jQuery 核心函数

  * `$()` 或 `jQuery()` 代表调用 jQuery 的核心函数，可以传递如下参数

    * 函数，如：`$(function(){})`
    * 字符串
      * 字符串选择器；返回一个 jQuery 对象，保存了找到的 DOM 元素
      * HTML 代码片段；返回一个 jQuery 对象，保存了创建的 DOM 元素
    * DOM 对象，把它包装成 jQuery 对象返回

  ```js
    // 传递函数
    $(function(){
        console.log('传递函数')
    });
    
    // 传递字符串选择器，返回 jQuery 对象，保存了找到的 DOM 元素
    var $box1 = $('.box1');
    var $box2 = $('#box2');
    console.log($box1, $box2);
    
    // 传递代码片段，返回 jQuery 对象，保存了创建的 DOM 元素
    var $p = $('<p>代码片段</p>');
    console.log($p); // jQuery.fn.init [p]
    $box1.append($p);
    
    // 传递 DOM 对象，把它包装成 jQuery 对象返回
    var span = document.getElementsByTagName('span')[0];
    var $span = $(span); // 将原生 DOM 元素包装成 jQuery 对象
    console.log(span);  // <span></span>
    console.log($span); // jQuery.fn.init [span, context: span]
    
  ```

    

* jQuery 对象

  * 一个 jQuery 对象是一个伪数组

  * 什么是伪数组：有从 0 到 length - 1 的属性、且有 length 属性的对象；

  ```js
    var $div = $('div');
    console.log($div);
    /*
        jQuery.fn.init(3)
        0: div
        1: div
        2: div
        context: document
        length: 3
        prevObject: jQuery.fn.init [document, context: document]
        selector: "div"
        __proto__: Object(0)
    */
  ```

    

* 静态方法与实例方法

  * 静态方法添加在类上面，通过类名调用
  * 实例方法添加在原型上面，通过实例调用

  ```js
  function ClassA () {};  // 创建类
  
  ClassA.staticMethod = function () { // 在类上添加静态方法
      console.log('static method');
  }
  ClassA.staticMethod();  // 通过类名调用静态方法
  
  
  ClassA.prototype.instanceMethod = function () {  // 在原型上添加实例方法
      console.log('instance method');
  }
  
  var instClassA = new ClassA(); // 创建实例
  instClassA.instanceMethod(); // 同实例调用实例方法
  ```




* jQuery 静态方法 $.each()

  * 格式：$.each(arr, function(index, value){})；
  * 回调函数的参数与原生forEach(function(value, index){}) 相反；
  * 原生 forEach 不支持伪数组，jQuery.each() 支持；

  ```js
  var arr = ['a','b','c','d','e','f'];
  var obj = {0:'z', 1:'y', 2:'x', 3:'w', 4:'v', 5:'u', length: 6}
  
  arr.forEach(function(value, index){
      console.log('index:', index, ' value:', value);
  })
  
  // 原生 JS 无法用 forEach 遍历伪数组
  // Uncaught TypeError: obj.forEach is not a function
  
  // obj.forEach(function(value, index){ 
  //     console.log('index:', index, ' value:', value);
  // })
  
  // jQuery.each 静态方法可以遍历数组和伪数组，但回调函数的参数index/value位置相反
  $.each(arr, function(index, value){
      console.log('index:', index, ' value:', value);
  })
  $.each(obj, function(index, value){
      console.log('index:', index, ' value:', value);
  })
  ```



* jQuery 静态方法 $.map()

  * 格式：$map(array, function(value, index){})；
  * 回调函数的参数顺序：function(value, index)，与原生JS一样；
  * 原生map不支持伪数组，jQuery.map() 支持；
  * jQuery 的 each 和 map 的区别：
    * each 返回值为原数组，不支持在回调函数中处理数组并返回；
    * map 默认返回空数组；支持在回调函数中进一步处理数组、并返回处理后的新数组；

  ```js
  var arr = ['a','b','c','d','e','f'];
  var obj = {0:'z', 1:'y', 2:'x', 3:'w', 4:'v', 5:'u', length: 6};
  
  arr.map(function(value, index){
      // console.log(index, value);
  })
  
  // 原生JS不支持用map遍历伪数组
  // Uncaught TypeError: obj.map is not a function
  // obj.map(function(value, index){
  //     console.log(index, value)
  // })
  
  var arrMapRes = $.map(arr, function(value, index) {
      console.log(index, value);
      return index + value;	// map 可以指定返回经过计算的结果
  });
  
  var objMapRes = $.map(obj, function(value, index) {
      console.log(index, value);	// map 默认返回空数组
  });
  
  var arrEachRes = $.each(arr, function(value, index){
      console.log(index, value);
      return index + value; // each 默认返回原数组，不支持指定返回值
  })
  
  console.log(arrMapRes);  // ["0a", "1b", "2c", "3d", "4e", "5f"]
  console.log(objMapRes);  // []
  console.log(arrEachRes); // ["a", "b", "c", "d", "e", "f"]
  ```

  

* jQuery 内容选择器

  * `:empty` - 选中内容为空的元素（没有文本、也没有子元素）
  * `:parent` - 选中有内容的元素（有文本和/或子元素、是其它节点的父元素）
  * `:contains(text)` - 选中包含了指定文本内容的元素
  * `:has(selector)` - 选中包含了指定子元素 selector 的元素
    
    ```js
    var $div1 = $('div:empty');	// 选中内容为空的 div
    var $div2 = $('div:parent');	// 选中存在文本或子元素、是其它节点的父元素的元素
    var $div3 = $('div:contains("我是div")');	// 选中包含了“我是div” 文本的元素
    var $div4 = $('div:has("span")');	// 选中包含 <span> 子元素的元素
```
    
    

* jQuery 属性和属性节点

  

  * 什么是属性：对象所保存的变量既是属性

    ```js
    function Person() {}
    var p1 = new Person() {
        p1.name = "lwm";	// 这里的 name 既是对象的属性
        console.log(p1.name);	// 获取属性
    }
    ```

    

  * 如何操作属性

    * 获取：`console.log(obj.attr);` 或 `console.log(obj["attr"]);`

    * 设置： `obj.attr = value;` 或 `obj["attr"] = value;`

      

  * 什么是属性节点

    * 在 HTML 标签中添加的属性，既是“属性节点”；

      * 在浏览器找到 DOM 元素，展开看到的都是属性；
      * 在 attributes 属性中保存的所有内容都是属性节点；
      * 所有对象都有属性，但只有 DOM 对象才有属性节点；

      ```html
      <span name="logo-wrap"></span>		<!-- 这里的 name 既是属性节点 -->
      ```

    * 查看方法：Chrome DevTools -> Sources -> 选中文件 -> 右侧 Watch -> new "document.getElementByTagName('span')" -> span -> attributes: NameNodeMap -> '0: name' <--- 这个就是属性节点之一；

      

  * 如何操作属性节点

    ```js
    var spanEl = document.getElementByTagName('span')[0];
    spanEl.setAttribute('name', 'anotherValue');	// 设置属性节点的值
    spanEl.getAttribute('name');	// 获取属性节点的值
    ```

  * 属性和属性节点的区别

    * 任何对象都有属性，但只有 DOM 对象才有属性节点



* jQuery 属性节点操作的方法

  * `.attr(name|pro|key, val|fn)` - 获取或设置属性节点的值

    * 只传递一个参数，表示获取属性节点的值 ---> 无论选中几个元素，都只返回第一个元素的属性节点值

      ```js
      console.log($('span').attr('class'));   // span1，示例代码中有两个 span 只返回第一个
      ```

    * 传递两个参数，表示设置属性节点的值 ---> 所有选中的元素的属性节点值都会被设置

      ```js
      $('span').attr('class', 'box');		// 所有 span 的 class 都被设置为 box
      $('span').attr('abc', '123'); 		// 若属性节点不存在，会自动新增
      ```

  * `.removeAttr(attrNode1 attrNode2 ...)` 删除属性节点 - 所有选中的元素的属性节点都会删除

    ```js
    $('span').removeAttr('class name abc');	// 同时删除三个属性节点
    ```

    