### Less 的基本使用

* 在浏览器中直接运行
  * 编写 Less 文件
  * 引入 Less 文件 `<link ref="stylesheet/less" href="style.less">`
  * 引入 Less.js 文件 `<script src="less.js"></script>`
  * 注意点：
    * 在 html 文件中，必须先引入 Less 样式文件、再引入 Less.js 预处理文件
    * 而且这种方法，只有在从服务器端运行代码才有效，本地运行没有效果
    * 在运行时编译，性能不佳
* 提前预编译
  * 编写 Less 文件
  * 工具转换 Less 为 CSS
    * 考拉： http://kaola-app.com/ （Win版不能改安装路径，否则会工作异常）
    * 开源中国 https://tool.oschina.net/less
    * 构建工具配置 loader 之后可以自动编译和导入
  * 引入 CSS 文件
  * 无需引入 Less.js、无需在服务器端运行



### Less 的特性

* 参考资料

  * https://less.bootcss.com/#overview	[CN]
  * http://lesscss.cn/features/     [EN]

* 语言特性

  * 注释：

    * 与JS一样的语法，单行 `// 这里是单行注释`，多行 `/* 这里是多行注释 */`
    * 单行注释不做预处理，即预处理之后，单行注释不会在CSS中出现

  * 变量：

    * 和 JS 变量的基本概念一样

    * 定义格式：`@var: val;` 也可以将一个变量赋值给另一个变量 `@var: @anotherVar;`

    * 定义在 { } 之外的是全局变量、{ } 之内的是局部变量；

    * Less 的变量是延迟加载的，写在后面也能在前面使用；

    * 不同作用域的变量不会互相影响，相同作用域的会互相影响，后定义的覆盖先定义的；

    * 访问变量采用就近原则

      ```less
      @width: 200px;
      @height: @width;
      @bgcolor: red;
      .box1 {
          width: @width;
          height: @height;
          background-color: @bgcolor;
      }
      ```

    * 变量插值：Less 的属性名称或选择器名称也可以用变量，但需要用插值的语法 `@{var}`

      ```less
      @width: 500px;
      @height: @width;
      @bgcolor: blue;
      
      @w: width;
      @h: height;
      @bgc: background-color;
      
      @box: div;
      
      @{box} {
          @{w}: @width;
          @{h}: @height;
          @{bgc}: @bgcolor;
      }
      ```

      预处理之后：

      ```css
      div {
        width: 500px;
        height: 500px;
        background-color: #0000ff;
      }
      ```

  * 运算：
  
    * 和 CSS3 的 calc() 函数一样，LESS 支持 ( + - * / ) 四则运算，但参与运算的数字要加上单位：
  
      ```less
      /* 单位可以加在前面、后面，也可以都加上 */
      margin-left: (-200px / 2);
      margin-right: (-200 / 2px);
      margin-bottom: (-200px / 2px);
      ```
  
  * 混合：
  
    * 将重复代码封装到类中，在需要使用的地方调用；
  
    * 预处理时，LESS 会将封装代码拷贝到使用的地方，本质上就是 Ctrl-C & Ctrl-V；
  
    * 类名若未加小括号，预处理之后仍会留在 CSS 中，加上小括号就不会包含在处理后生成的 CSS 中；
  
    * 引用时，类名之后的小括号可加、可不加；
  
      ```less
      .center() {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
      }
      
      .parent {
          width: 500px;
          height: 500px;
          background-color: turquoise;
          .center();
          
          .child {
              width: 300px;
              height: 300px;
              background-color: orangered;
              .center();
          }
      }
      ```
  
    * 带参数的混合：
  
      * 格式：  .class(@attr: defaultValue, @attr2: defaultValue, ...)
      * 参数默认值设或不设均可；
      * 引用时如有默认值，可以不用传参，如下 .whc(); 即可按默认值引用；
      * 引用时如只传递部分参数，写上参数名，如 .whc(@w:red)，其它参数会按默认值处理；
  
      ```less
      .whc(@w:100px, @h:100px, @c:pink) {
          width: @w;
          height: @h;
          background-color: @c;
      }
      
      .box1 {
          .whc(@c:yellowgreen);
          // .whc(200px, 200px, turquoise);
      
          // width: 200px;
          // height: 200px;
          // background-color: turquoise;
      }
      .box2 {
          .whc(300px, 300px, orangered);
          // width: 300px;
          // height: 300px;
          // background-color: orangered;
      }
      ```
  
    * 可变参数：
  
      * 类似 JavaScript 函数自带属性 arguments，在 LESS 中也有 arguments 属性表示所有参数；
      * 如此，可以不用写具体的参数，参数用三个点 (...) 代替即可，表示 0~N 个参数；
      * 如果有部分参数是必须的，可以写上参数，最后用 (...) 表示还可以有其它 0-N 个参数；
      * 注意：三个点 (...) 只能写在最后；
  
      ```less
      // .animate(@element: all, @duration: 1s, @mode: linear, @delay: 0s) 
      // .animate(...) {
      .animate(@element, @duration, ...) {
          transition: @arguments;
      }
      div {
          width: 200px;
          height: 200px;
          background-color: seagreen;
          .animate(all 2s ease 0s);
      }
      
      div:hover {
          width: 400px;
          height: 400px;
          background-color: greenyellow;
      }
      ```
  
    * 混合的匹配模式：
  
      * 在形参列表的最前面加上一个字符串，用于区分多个同名的类；
      * 如下画三角形 div 的代码，就使用参数中 down/up 字符串来确定引用的是哪一个类；
  
      ```less
      .triangle(down, @width, @color) {
          width: 0;
          height: 0;
          border-width: @width;
          border-style: solid solid solid solid;
          border-color: @color transparent transparent transparent;
      }
      
      .triangle(up, @width, @color) {
          width: 0;
          height: 0;
          border-width: @width;
          border-style: solid solid solid solid;
          border-color: transparent transparent @color transparent;
      }
      
      div {
          .triangle(down, 80px, red);
      }
      ```
  
      * 混合的通用匹配模式：
  
        * 把冗余代码抽离，在参数列表用 @_ 表示当前这个类是同名类通用的；
        * 无论哪个同名的混合被匹配了，都会先执行通用匹配模式中的代码；
  
        ```less
        .triangle(@_, @width, @color) {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: @width;
        }
        .triangle(down, @width, @color) {
            border-color: @color transparent transparent transparent;
        }
        
        .triangle(up, @width, @color) {
            border-color: transparent transparent @color transparent;
        }
        
        div {
            .triangle(down, 80px, red);
        }
        ```
  
        
  
  * 在 LESS 文件中导入其它 LESS 文件：
  
    ```less
    @import "other-less-file.less";
    @import "more-less-file"; 
    // 扩展名可以省略
    ```
  
    
  
  * LESS 内置函数
  
    * LESS 由 JavaScript 实现，因此 JS 中常用的函数在 LESS 中都支持；
  
    ```less
    @color: seagreen;
    div {
        width: 1000px;
        height: 1000px;
        background-color: @color;
        &:hover {
        background-color: saturate(@color, 50%);
        }
    }
    ```
  
    
  
  * LESS 的层级结构
  
    * 在一个选择器中写了其它选择器，会预处理成后代选择器；
  
    * & 符号会拼接同级的选择器，不会处理成后代选择器；
  
      ```less
      .parent {
          .child {
          }
          &:hover {
          }
          &::before {
              content: 'child-elm';
              display: block;
              width: 100px;
              height: 100px;
              border: 1px solid #000;
          }
      }
      // 转换为 CSS 后：
      .parent {}
      .parent .child {}
      .parent .child:hover {}
      ```
  
      
  
  * 混合与继承的区别：
  
    * 混合是直接拷贝代码到响应的选择器中，代码较冗余；
    * 继承是通过并集选择器，使多个选择器使用同一段代码，因此精简了代码；
  
    ```less
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .parent:extend(.center) {
        width: 400px;
        height: 400px;
        background-color: red;
        .child:extend(.center) {
            width: 200px;
            height: 200px;
            background-color: blue;
        }
    }
    ```
  
    预处理之后：
  
    ```css
    .center,
    .parent,
    .parent .child {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .parent {
      width: 400px;
      height: 400px;
      background-color: red;
    }
    .parent .child {
      width: 200px;
      height: 200px;
      background-color: blue;
    }
    ```
  
    
  
  * LESS 混合中的条件判断：
  
    * LESS 可通过 when 表达式给混合添加执行限定条件，条件为真才会执行代码；
    * when 表达式可以使用比较运算符、逻辑运算符、或检查函数（如`ispixel(@width)`）来判断条件；
  
    ```less
    .size(@width, @height) when (@width = 50px), (@height = 100px) {
        width: @width;
        height: @height;
    }
    
    div {
        .size(100px, 100px);
        background-color: red;
    }
    ```
  
    * 逻辑或： `(), ()` 相当于 JS 的 `||`
    * 逻辑与： `() and ()` 相当于 JS 的 `&&`