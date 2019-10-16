# Bootstrap

###### what is Bootstrap?

* Twitter 推出的用于开发响应式布局、移动设备优先的 Web 框架；

* 当前最新版本 Bootstrap 4，使用最多的仍是 Bootstrap 3；

* BS 3 与 BS 4 的主要区别：

  |              | Bootstrap 3 | Bootstrap 4 |
  | ------------ | ----------- | ----------- |
  | CSS 预处理器 | LESS        | SASS        |
  | 格栅种类     | 4 种        | 5 种        |
  | 长度单位     | px          | rem         |
  | 布局         | float       | flexbox     |

* Bootstrap 兼容性：
  * BS 目标是：在最新的桌面和移动浏览器上有最佳的表现；即：在老旧浏览器上可能导致样式不同，但功能完整；
  * IE 8 以上能完美使用，IE 8 以下需要通过额外配置来保证完整性；

  

###### Bootstrap 配置：

* BS 3 未完全放弃 IE 8 以下浏览器，其中的模板有很多对老旧浏览器的兼容配置；
* BS 4 已放弃对 IE 8 以下浏览器的支持，因此模板比 BS 3 简单；

* BS 3 兼容配置：

  * 响应式也是通过媒体查询实现；

  * 媒体查询从 CSS 3 开始支持；

  * IE 9 开始才支持 CSS 3；

  * 在 IE 8 及以下需要引入 Respond.js 才能实现媒体支持；

    * `<!-- [if lt IE 9] ![endif] -->` 是 IE 的条件注释，仅 IE 会执行；

      ```html
      <!--[if lt IE 9]>  如果小于 IE 9，就导入如下两个 JS 文件
      <script src="html5shiv.js"></script>
      <script src="respond.js"></script>
      <![endif]-->
      ```

    * `html5shiv.js` 使得 IE 8 可以使用 HTML 5 新增标签；

    * `respond.js` 使得 IE 8 可以使用媒体查询；

  * BS 所有 JS 插件都依赖于 jQuery，因此需要引入 jQuery；

  * 由于浏览器安全机制的限制，引入 Respond.js 后无法在本地打开，需要通过服务器访问的形式打开；

  * BS 不支持 IE 古老的兼容模式，为让 IE 运行于最新渲染模式下，需加入标签：

    ```html
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <!-- 意即：有 edge 就用 edge渲染，而不是用 IE 渲染 -->
    ```

  * 国产浏览器的兼容模式（IE 内核）和高速模式（Webkit 内核），通常默认兼容模式，从而导致基于 BS 构建的网站展示效果差；可将如下标签加上，使得国产浏览器使用高速模式渲染：

    ```html
    <meta name="renderer" content="webkit">
    ```

  * 为保证在移动端正常显示：

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ```

* BS 3 完整模板：

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="utf-8">
      <!--可以让部分国产浏览器默认采用高速模式渲染页面-->
      <meta name="renderer" content="webkit">
      <!--为了让 IE 浏览器运行最新的渲染模式下-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--为了保证在移动端能够正常的显示-->
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>自己网页的标题</title>
      <!-- 导入Bootstrap的CSS文件 -->
      <link rel="stylesheet" href="css/bootstrap.css">
  
      <!--导入respond.js文件的目的, 是为了能够在IE8以及IE8以下的浏览器中使用媒体查询-->
      <!--导入html5shiv.js文件的目的, 是为了能够在IE8以及IE8以下的浏览器中使用H5新增的标签-->
      <!--
      [if xxx] ![endif]这个是IE中的条件注释, 只有在IE浏览器下才会执行
      以下代码的含义: 如果当前是IE9以下的浏览器, 那么就导入以下的两个JS文件
      -->
      <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
          <script src="js/respond.js"></script>
      <![endif]-->
  </head>
  <body>
  <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
  <script src="js/jquery-1.12.4.js"></script>
  <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
  <script src="js/bootstrap.js"></script>
  </body>
  </html>
  ```

  
  
* Bootstrap 4 模板

  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <!--字符集-->
          <meta charset="utf-8">
          <!--移动端适配-->
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <!--BS样式表-->
          <link rel="stylesheet" href="css/bootstrap.css">
      </head>
      <body>
          
          <script src="js/jquery.js">
          <script src="js/popper.js"> <!--提示条和弹窗的插件-->
          <script src="js/bootstrap.js">
      </body>
  </html>
  ```




###### Bootstrap 容器

* 概念：
  * 容器是 BS 响应式布局的基础，BS 将所有内容定义在容器中；
  * 容器是启用栅格系统的前置条件；

* 种类：

  * container （固定容器）
    * 给标签加上 container 类名即为 BS 的容器，即可在不同视口有不同固定宽度；
  * container-fluid（自适应宽度的容器）
    * 给标签添加 container-fluid 类名即可；该类容器的宽度均为 100% 自适应；

* BS 视口划分：

  * BS 4 五种，设定后，固定容器即为所设宽度：

    | 分类     | 类名 | 大小                                    |
    | -------- | ---- | --------------------------------------- |
    | 超小屏幕 | xs   | <   576px （小于此宽度后自动设为 100%） |
    | 小屏幕   | sm   | \>= 576px                               |
    | 中等屏幕 | md   | \>= 768px                               |
    | 大屏幕   | lg   | \>= 996px                               |
    | 超大屏幕 | xl   | \>= 1200px                              |

* 容器实现原理：

  * container-fluid

    ```css
    container-fluid {
        width: 100%;
    	padding-left: 15px;
    	padding-right: 15px;
    	margin-left: auto;
    	margin-right: auto;
    }
    ```

  * container（加入媒体查询）

    ```css
    container {                  /* 超小屏幕 */
        width: 100%;
    	padding-left: 15px;
    	padding-right: 15px;
    	margin-left: auto;
    	margin-right: auto;
    }
    @media (min-width: 576px) {   /* 小屏幕 */
        .container {
            max-width: 540px;
        }
    }
    @media (min-width: 768px) {   /* 中屏幕 */
        .container {
            max-width: 720px;
        }
    }
    @media (min-width: 992px) {   /* 大屏幕 */
        .container {
            max-width: 960px;
        }
    }
    @media (min-width: 1200px) {   /* 超大屏幕 */
        .container {
            max-width: 1140px;
        }
    }
    ```

    

###### Bootstrap 栅格系统

* 概念：

  * Bootstrap 栅格系统使用一系列 ”行“ 和 ”列“ 来实现复杂的响应布局；
  * 栅格系统默认将一行等分为12份；
  * 通过绑定类名来指定一行中的每一列占多少份的 1/12；

* 格式：三层结构

  ```html
  <div class="container">
      <div class="row">
          <span class="col col-6">column 1</span>
          <span class="col col-4">column 2</span>
          <span class="col col-2">column 3</span> <!--宽度份数总和超过12的话会自动换行-->
      </div>
  </div>
  ```

* BS 4 栅格实现原理：

  ```css
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  
  .col {
    flex-basis: 0; /* 相当于 width: 0 */
    flex-grow: 1;  /* 允许 grow，有3列的话，就将父容器的宽度等分为3份 */
    max-width: 100%;
  }
  
  .col-6 {
    flex: 0 0 50%;		/* grow: 0, shrink: 0, basis: 50% */
    max-width: 50%;
  }
  ```

* BS 3 的栅格则是将列设为浮动，再设置列的宽度为父容器的百分比；

  ```css
  .col-xs-9,
  .col-xs-10,
  .col-xs-11,
  .col-xs-12 {
    float: left;
  }
  .col-xs-12 {
    width: 100%;
  }
  .col-xs-11 {
    width: 91.66666667%;
  }
  .col-xs-10 {
    width: 83.33333333%;
  }
  .col-xs-9 {
    width: 75%;
  }
  ```

* 列的宽度设置：

| CSS 类名前缀 | 备注                                                         |
| ------------ | ------------------------------------------------------------ |
| `col-*`      | 设置超小屏幕                                                 |
| `col-sm-*`   | 设置小屏幕                                                   |
| `col-md-*`   | 设置中等屏幕                                                 |
| `col-lg-*`   | 设置大屏幕                                                   |
| `col-xl-*`   | 设置超大屏幕（只适用于超大屏幕，其它尺寸的屏幕会自动把宽度设为 100%） |

* 如果只设置了小屏幕的类，则大屏幕也会采用小屏幕的设置；

* 如果只设置了大屏幕的类，则小屏幕默认为 100%；

* 如果大小屏幕都设置了类，则在什么屏幕就显示什么尺寸；

  ```html
  <!-- 这样设置的话，在不同大小的屏幕上，各个列的宽度会有变化 -->
  <div class="col-lg-2 col-xl-6"> col 1 </div>
  <div class="col-lg-4 col-xl-2"> col 1 </div>
  <div class="col-lg-6 col-xl-4"> col 1 </div>
  ```

  

* 沟槽（gutters）

  * BS 默认栅格和列，左右有 15px 的 margin 或 padding，即沟槽；

  * 可以在 row 上添加 `no-gutters` 类、在 container 上添加 `px-0` 类来消除；

  * 也可手工设置 margin / padding 消除；

    ```html
    <div class="container px-0">
        <div class="row no-gutters">
            <div class="col-3">col 3</div>
            <div class="col-5">col 5</div>
            <div class="col-4">col 4</div>
        </div>
    </div>
    ```

    

* 对齐

  * 在 row 上面添加 `justify-content-start`, `justify-content-end`, `justify-content-between`, `align-items-center` 等来实现对齐方式的调整；

    ```html
    <div class="container">
        <div class="row align-items-center justify-content-around">
            <div class="col-2">col 2</div>
            <div class="col-2">col 2</div>
            <div class="col-2">col 2</div>
        </div>
    </div>
    ```

    

* 偏移和排序

  * 给列添加 `offset-n` 使得其起点偏移 n/12 份，也可以实现居中对齐、两端对齐等效果

    ```html
    <div class="container">
        <div class="row">
            <div class="col-2 offset-3">col 2</div>
            <div class="col-2">col 2</div>
            <div class="col-2">col 2</div>
        </div>
    </div>
    ```

    

  * 给列添加 `order-n`  类，即可调整各个列的排序；注意：没有添加 `order-n` 类的列不参与排序，优先于设置了 `order-n` 的列、排在前面；

    ```html
    <div class="container">
        <div class="row">
            <div class="col-2 order-2">col 3</div>
            <div class="col-2 order-1">col 5</div>
            <div class="col-2 ">col 4</div>
        </div>
    </div>
    ```

    

* 公共样式类

  * 文字颜色（需注意：.text-white 和 .text-white 不支持用在链接上）

    ```html
    text-muted
    text-primary
    text-secondary
    ...
    ```

  * 背景颜色

    ```html
    bg-primary
    bg-success
    bg-danger
    bg-warning
    bg-info
    bg-dark
    ...
    ```

  * 边框

    ```html
    border / border-top ...		快速添加边框
    border-0 / border-top-0 ... 取消边框
    border-info ...				添加边框颜色
    rounded / rounded-top ...	添加边框圆角
    ```

  * 浮动

    ```html
    float-left
    float-right
    float-md-left
    float-md-left
    clearfix
    ...
    ```

  * 定位

    ```html
    position-relative
    position-absolution
    position-fixed
    ...
    ```

  * 边距

    ```html
    m-* / p-*
    m-1		// margin: 1rem
    mt-1	// margin-top: 1rem
    mt-sm-1 // 根据VP添加
    m-0		// 清除margin
    m-auto	// 水平居中
    
    ```

  * 项目符号

    ```html
    <ul class="list-unstyled">
    ```

  * 图片相关

    ```
    <img src="1.jpg" class="img-fluid">		// 等比拉伸 （width/height:100%）
    <img src="1.jpg" class="img-thumbnail">	// 相册/缩略图效果（添加圆角、边框、内边距）
    ```

    

* 组件 - 对特定功能的封装

  * 提示框 

    ```html
    <div class="alert alert-success" role="alert">
        <!-- role 用于增强语义 -->
    </div>
    ```

    * `role` 属性可选，用于增强 div 的语义，明确此 div 的用途，利于识别代码和 SEO；
    * `aria-xxx`：aria 即 Accessible Rich Internet Applications，是w3c和Apple制定的为残障人士无障碍使用网站的协议；在某些阅读器上可以指明元素的类型（如关闭按钮）；
    * `aria-hidden` 避免屏幕识读设备输出对盲人无意义的内容，可以设置此属性，对识读设备隐藏此部分的内容；