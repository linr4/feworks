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

* Bootstrap 的配置：

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

    

