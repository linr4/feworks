# jQuery 原理



### jQuery 基本结构

* jQuery 本质是一个闭包（立即执行函数 —— 定义的时候就让它执行的函数）；

  ```js
  (function (window, undefined) {
      var jQuery = function () {
          // jQuery 源码中的 jQuery.fn 等于 jQuery.prototype
          return new jQuery.prototype.init();
      };
      jQuery.prototype = {
          constructor: jQuery
      };
      jQuery.prototype.init.prototype = jQuery.prototype;
      window.jQuery = window.$ = jQuery;
  })(window);
  ```

* 用闭包来实现的原因：

  * 在项目中引入了多个框架时，避免与其它框架中同名的方法/属性（函数/变量）冲突；

* jQuery 通过 `window.jQuery = jQuery` 把内部函数和变量暴露给外部调用；

* jQuery 为何给自己传递一个 `(window)` 参数？

  * 代码压缩后参数/变量名会改变，需要有明确的内部变量指向 `window` 对象；
  * 提升查找效率（内部有变量指向 `window` 就可直接引用，无需再查找全局 `window` 对象）；

- jQuery 为何给自己传递一个 `(undefined)` 参数？

  - 避免 IE8 及以下版本的浏览器中，`undefined` 被修改；高版本的 `undefined` 无法重定义；

    ```js
    undefined = 777;
    console.log(undefined);	// IE8 输出 777，其它认为 undefined
    ```

    

### jQuery 入口函数

* 测试 jQuery 入口函数传入不同参数时得到的实例

  * 传入 ''（空字符串），null，undefined，NaN， 0，false；

    * 返回一个空的 jQuery 对象；

    ```js
    // 不传或传入以下参数，都返回空对象 jQuery.fn.init
    console.log($());           // jQuery.fn.init
    console.log($(''));         // jQuery.fn.init
    console.log($(null));       // jQuery.fn.init
    console.log($(undefined));  // jQuery.fn.init
    console.log($(NaN));        // jQuery.fn.init
    console.log($(0));          // jQuery.fn.init
    console.log($(false));      // jQuery.fn.init
    ```

  * 传入 HTML 片段；

    * 返回包含了创建好了DOM元素的jQuery对象

    ```js
    // 传入HTML代码片段，返回包含了创建好了DOM元素的jQuery对象
    console.log($('<p>1</p><p>2</p><p>3</p>')); // jQuery.fn.init(3) [p, p, p]
    ```

  * 传入选择器；

    * 返回包含了所找到的元素的jQuery对象

    ```js
    // 传入选择器，返回包含了所找到的元素的jQuery对象
    console.log($('li'));
    // jQuery.fn.init(3) [li, li, li, prevObject: jQuery.fn.init(1), context: document, selector: "li"]
    ```

  * 传入真数组或伪数组；

    * 返回包含了依序存储了数组成员的jQuery对象

    ```js
    console.log($([10,20,30,40]));  
    /*jQuery.fn.init(4) [10, 20, 30, 40]
        0: 10
        1: 20
        2: 30
        3: 40
        length: 4
    */
    var arrLike = {0:'name', 1: 'gender', 3:'age', length: 3};
    console.log($(arrLike));
    /*jQuery.fn.init [{…}]
        0:
        0: "name"
        1: "gender"
        3: "age"
        length: 3
        __proto__: Object
        length: 1
    */
    ```

  * 传入对象；

    * 返回包含了该对象的jQuery对象

    ```js
    // 传入对象，返回包含了该对象的jQuery对象：
        function Person() {};
        console.log($(new Person()));
        /*jQuery.fn.init [Person]
            0: Person
            __proto__: Object
            length: 1
            __proto__: Object(0)
        */
    ```

  * 传入 DOM 元素；

    * 返回包含了该DOM元素的jQuery对象

  * ```js
    // 传入DOM元素，返回包含了该元素的jQuery对象；
        console.log($(document.createElement('div')));
        /*jQuery.fn.init [div, context: div]
            0: div
            context: div
            length: 1
            __proto__: Object(0)
        */
    ```

  * 传入基本数据类型（非字符串）；

    * 返回包含了该基本数据类型的jQuery对象

    ```js
    // 传入基本数据类型，返回包含了该基本数据类型的jQuery对象
    console.log($(123));    // jQuery.fn.init [123]
    console.log($(true));   // jQuery.fn.init [true]
    ```

* **结论**：

  1. 不传参数，或传入 ''（空字符串），null，undefined，NaN， 0，false，返回空jQuery对象；

  2. 传入字符串：

     * HTML 代码片段：返回包含了创建好了DOM元素的jQuery对象；

     * 选择器：返回包含了所找到的元素的jQuery对象；

  3. 数组：返回包含了依序存储了数组成员的jQuery对象；

  4. 除上述之外：返回包含了该数据的jQuery对象；



* 工具方法的抽取

  ```js
  // 去除字符串前后空格的静态方法
  njQuery.trim = function (str) { 
      if (window.trim) {  // 如果浏览器支持 trim() 方法，执行之
          return str.trim();
      } else {    // 否则用正则表达式来操作：
          return str.replace(/^\s+|s+$/g, '');
          // \s 匹配一个空格，\s+ 匹配一个或多个空格
          // ^\s+ 匹配以空格起始的字符串中的一个或多个空格，
          // | 或，
          // \s+$ 匹配以空格结尾的字符串中的一个或多个空格，
          // g全局匹配；
          // 第二个参数''，替换成空字符串
      }
  };
  
  // 判断是否为字符串的静态方法
  njQuery.isString = function (param) { 
      return 'string' === typeof param;
  };
  
  // 判断是否为HTML字符串的静态方法
  njQuery.isHTML = function (param) { 
      return '<' === param.charAt(0) && '>' === param.charAt(param.length - 1) && 3 <= param.length;
      // 如果字符串以 ‘<’ 起始、以 ‘>’ 结尾，且长度大于等于3（如 <a> 标签），即为 HTML 代码
  };
  ```

* 代码片段优化：将第一级元素添加到 jQuery 对象中，有两种方法：

  ```js
  // 1. 用 for 循环遍历 DOM 对象、逐个添加到 jQuery 对象
  
  for (var i = 0; i < tempEl.children.length; i++) {
      this[i] = tempEl.children[i];}
  this.length = tempEl.children.length;  // 添加 length 属性
  
  // 2. 调用数组方法把 tempEl.children 这个 HTMLCollection 伪数组 push 到 jQuery 对象中
  
  [].push.apply(this, tempEl.children);
  ```


  * 知识点：`[].push.call(obj, p1, p2, ...)` 和 `[].push.apply(obj, [p1, p2, ...])`

    * 作用都是让原本没有 `push` 方法的 `obj` 对象可以调用/借用数组的 `push` 方法，`this` 指向 `obj`；
    * 区别是参数传递方法不同，`call` 直接写参数在 `obj` 后面，而 `apply` 需要把参数放在数组里传递；

  * 知识点：真伪数组的互相转换

      * 伪数组分两种：
      * 系统自带的伪数组，如：`document.querySelectorAll('div')` 返回的 NodeList；
          * 用户自定义的伪数组，如：`var obj = {0: "name", 1: "age", length: 2}`；
      
    ```js
var arr = [1,3,5,7,9];
    var obj = {};
    [].push.apply(obj, arr);	// 真数组转伪数组
    
    // 
    
    var divEls = document.querySelectorAll('div');
    var obj2 = {0: "name", 1: "age", length: 2};
    var arr2 = [];
    [].push.apply(arr2, divEls);        // 伪数组转真数组；IE8 及以下不支持，要借用slice()实现
    var arr3 = [].slice.call(divEls);	// 所有浏览器都支持，包括 IE8
    ```

    * 小结：
      * 真数组转伪数组，用 `[].push.apply(realArr, pseudoArr)`
      * 伪数组转真数组，用 `var realArr = [].slice.call(psuedoArr)`
    * 补充：`arr.slice(startIndex, endIndex)` 返回从起点索引到终点索引的新数组（不包括终点），只有起点则索引会默认从起点到结束，不带参数则返回一个原样的数组；
    * 示例：
    
    ```js
    var arr1 = [1,3,5,7,9];
    var obj1 = {};
    
    var arr2 = [];
    var obj2 = {0: "name", 1: "age", length: 2};
    
    // 真数组转伪数组
    [].push.apply(obj1, arr1);
    console.log(obj1);  // {0: 1, 1: 3, 2: 5, 3: 7, 4: 9, length: 5}
    
    // 伪数组转真数组
    [].push.apply(arr2, obj2);  // 和真转伪对比，俩参数对调
    console.log(arr2);  // (2) ["name", "age"]
    
    var arr3 = [].slice.call(obj2); // 推荐用这种方法，兼容 IE8
    console.log(arr3);  // (2) ["name", "age"]
    
    // 真数组转真数组
    var arr4 = arr1.slice();
    console.log(arr4);  // (5) [1, 3, 5, 7, 9]
    var arr5 = [];
    [].push.apply(arr5, arr1);  // (5) [1, 3, 5, 7, 9]
    console.log(arr5);
    
    // 伪数组转伪数组
    var obj3 = {};
    [].push.apply(obj3, obj1);
    console.log(obj3);  // {0: 1, 1: 3, 2: 5, 3: 7, 4: 9, length: 5}
    ```

