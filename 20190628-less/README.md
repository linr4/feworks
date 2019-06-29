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

      