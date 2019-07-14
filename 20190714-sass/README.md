### 什么是 SASS

* 用 Ruby 实现的 CSS 预处理器，诞生于 2007 年；
* 扩展了 CSS，增加了变量、Mixin（混合）、嵌套、函数、运算等特性

### 如何学习 SASS

* LESS 是用 JS 实现的，诞生于 2009 年，大量特性与 SASS 一样，只要会了 LESS，也就会了大部分 SASS；

  

### SASS 两种扩展名和格式

* SASS 文件有 .sass 和 .scss 两种扩展名
  * .sass 以缩进代替 { } 表示层级结构，语句结尾无需分号
  * .scss 以 { } 表示层级结构，语句结尾需要分号
  * 实际开发中推荐使用 .scss 格式
* 若用 Koala 编译，则项目中的目录和文件名均不能有中文或其它特殊字符



### SAS 注释

* 与 LESS 一样，// 单行注释，/* */ 多行注释
* 单行注释不会编译到 CSS 中



### SASS 变量

* SASS 与 LESS 定义格式有区别
  * LESS 变量定义：@var: value;
  * SASS 变量定义：$var: value;
* SASS 变量的特点：
  * 大部分与 LESS 相同：
    * 后定义覆盖先定义
    * 把变量赋值给其它变量
    * 区分全局与局部变量，访问采用就近原则
  * 区别：
    * LESS 变量延迟加载，可先使用后定义
    * SASS 变量不是延迟加载，必须先定义后使用



### SASS 变量插值

* 什么事变量插值？

  * 变量若作为属性的取值，引用时可以直接使用变量名
  * 变量若是属性名称或选择器名称，则不能使用变量名，需要用变量插值的格式来引用

* 格式

  * SASS 变量插值格式： @{变量名称}
  * LESS 变量插值格式： #{$变量名称}

  ```scss
  $elm: div;
  $w: width;
  $size: 200px;
  #{$elm} {
      #{$w}: $size;
      height: 200px;
      background-color: skyblue;
  }
  ```

  

### SASS 运算

* 支持数值和变量的四则运算（+ - * /）

  ```scss
  .box1 {
      position: absolute;
      left: 50%;
      margin-left: (-$size / 2);
      margin-top: (200px * 2);
  }
  ```

  

### SASS 混合

* LESS

  * 定义混合：.混合名称 { }; 或 .混合名称 () { };
  * 调用混合：.混合名称;  或 .混合名称 () ;

* SASS

  * 定义混合：@mixin 混合名称 { }; 或 @mixin 混合名称 () { };
  * 调用混合：@include 混合名称; 或 @include 混合名称 ();

* 带参数的混合

  ```scss
  @mixin whc($w: 100px; $h: 100px; $c: #aaa) {
      width: $w;
      height: $h;
      background: $c;
  }
  .box1 {
      // @include whc(); // 不带参数
      // @include whc(200px, 200px, red); // 带参数
      @include whc($c: green); // 带部分参数
  }
  ```

* 带可变参数的混合，使用 $args...（LESS 由于是 JS 写的，可以直接用 arguments，而 SASS 不行）

  ```scss
  @mixin animate ($name, $time, $args...) {
      transition: $name $time $args;
  }
  div {
      width: 200px;
      height: 200px;
      background: blue;
      @include animate(all, 4s, linear, 0s);
  }
  ```

  

### SASS 文件导入

* `@import "filename.scss";`
* 原生 CSS 也支持 @import 导入其它 CSS 文件，但只有浏览器执行到 @import 时才去下载对应的 CSS 文件，请求次数多了之后页面加载变慢，实际上不常用；
* LESS 和 SASS 的 @import 会将目标文件拷贝到当前文件中并生成一份 CSS，只请求一次，速度快；



### SASS 内置函数

> 参考 https://www.sass.hk 或 https://sass-lang.com

* unquote($string)：删除字符串中的引号；
* quote($string)：给字符串添加引号；
* To-uppper-case($string)：将字符串中的字母转为大写；

> 建议不要过度使用和依赖函数，做好 CSS 的本职工作即可

```scss
$function square($num) { // 自定义函数
    @return $num * $num + px;
}
div {
    width: square(2);
    height: 200px;
    background: mix(red, blue); // 内置函数
}
```



### SASS 层级结构

* 默认嵌套转为后代选择器
* 通过 & 符号转为同级选择器

```scss
.parent {
    width: 300px;
    height: 300px;
    background: red;
    &:hover {
        width: 400px;
        height: 400px;
    }
    .child {
        width: 200px;
        height: 200px;
        background: green;
    }
}
```



### SASS 继承

* 先定义一个类，再在其它选择器中引用；
* 编译为并集选择器（selector1,selector2,selector3, ...）
* 和 mixin 的区别：mixin 是拷贝代码到指定位置，而类继承会转换为并集选择器，多个选择器共用一段代码；

```scss
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.parent {
    @extend .center;
    width: 200px;
    height: 200px;
    background: red;
    
    .child {
        @extend .center;
        width: 100px;
        height: 100px;
        background: blue;
    }
}

// 编译之后

.center, .parent, .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.parent {
    width: 200px;
    height: 200px;
    background: red;
}
.child {
    width: 100px;
    height: 100px;
    background: blue;
}
```



### SASS 条件判断

```scss
@if(condition){}
@else if(condition) {}
...
@else(condition){}
//当条件不为 false 或 null 时就会执行 {} 中的代码
```

画三角形的例子：

```scss
@mixin triangle($dir, $width, $color) {
    width: 0;
    height: 0;
    border-width: $width;
    border-style: solid;
    @if($dir = UP) {
        border-color: transparent transparent $color transparent;
    } @else if($dir = DOWN) {
        border-color: $color transparent transparent transparent;
    } @else if($dir = LEFT) {
        border-color: transparent $color transparent transparent;
    } @else if($dir = RIGHT) {
        border-color: transparent transparent transparent $color;
    }
}
div {
    @include triangle(UP, 50px, blue);
}
```

