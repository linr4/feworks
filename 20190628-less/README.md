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