# 苏宁商城 - 练习

#### 创建网站项目的步骤：

* 新建目录结构，引入必要的文件：

  ```
  css/
  	--/reset.css
  	--/normalize.css
  	--/base.css   /* 自定义的全局样式和公共类 */
  	--/index.css
  images/
  js/
  index.html
  favicon.ico
  ```

* 设置 favicon.ico 图标：

  * 可以用其它格式的图片在工具网站上生成 favicon.ico 图标文件，如：比特虫 [bitbug.net](https://www.bitbug.net/)
  * 在 head 中添加 `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`

* 添加 **SEO 三大标签**

  * **标题** -  `<title> abc </title>`
    * 是网页最重要的标签，是搜索引擎了解网页的入口，是网页主题归属的最佳判断点；
    * 标题长度： Google 为 35 个中文，Baidu 为 25 个中文；
    * 格式：网站名（产品名）- 网站的介绍；
    * 例：
      * `<title> 淘宝网 - 掏！我喜欢 </title>`
      * `<title> 京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！ </title>`
      * `<title> 苏宁易购(Suning.com)-送货更准时、价格更便宜、上新货更快 </title>`
    * 特点：越先出现的词语，权重越高

  * **关键词** - `keywords`
    * 是页面的关键词，是搜索引擎重点关注之一；
    * 一般在 6 ~ 8 个左右的关键词，电商类网站可以多几个；由专业的关键词流量分析人员提供；
    * 例：`<meta name="keywords" content="苏宁易购网上商城,苏宁电器,Suning,手机,电脑,冰箱,洗衣机,相机,数码,家居用品,鞋帽,化妆品,母婴用品,图书,食品,正品行货" />`
  * **网站说明** - `description`
    * 对于在 title 和 keywords 中未能充分表述的内容进行补充；
    * 搜索引擎作为 "站点内容摘要" 显示在搜索结果中；
    * 字数不超过 120 个汉字；
    * 给搜索用户看的，尽量详细体现站点主题内容，让用户感兴趣，吸引用户点击；
    * 格式：`<meta name="description" content="详细内容…… ">`

* 导入 CSS 样式重置文件，如 reset.css 、normalize.css 等，以保持各种浏览器渲染的一致性；
* 在 body 标签上设置全局通用的样式，如：字体、行高、颜色等；
  
* `body { font: 12px/1.5em "Microsoft Yahei", tahoma; } ` 12px 字体大小、1.5em 行高；
  
* 兼容性策略的确定：“优雅降级” 还是 “渐进增强”
  * 渐进增强：针对低版本浏览器进行页面构建，保证最基本的功能，在针对现代浏览器进行效果和交互的改进，以及追加功能以达到更好的用户体验；
  * 优雅降级：在现代浏览器上构建完整功能，再针对低版本浏览器进行兼容，实现基本功能；
  * 根据站点的用户群体使用浏览器类型确定；大趋势是低版本浏览器在逐渐淘汰中，微软亦已放弃 IE，多数情况下可选择优雅降级策略；
  * 优雅降级常见做法：为低版本浏览器单独制作跳转页面，提示用户使用现代浏览器访问；
    * 测试工具：IETester；





#### Tips:

* 给行内元素（inline elements）添加形变属性（transform）是无效的，需转换成 block / inline-block 方可；

* 整站的版心样式大部分一样，可以提取为公共类，把 CSS 类直接加在 HTML 容器标签上，优化代码结构：

  ```css
  .wrapper {
      width: 1190px;
      height: 100%;
      margin: 0 auto;
  }
  ```

* 底部五个【小图标+小标题+说明文字】区块可以使用 `dl>(dt>a>img)+(dd>a)+dd{text}` 的结构，`dt` 左浮使得其右侧的文字自动环绕；

  ```html
  <dl>
      <dt><a href="#"><img src="icon1.jpg" class="float-left"></a></dt>
      <dd><a href="#">正品保障</a></dd>
      <dd>正品保障 提供发票</dd>
  </dl>
  ```

* 容器标签即使没有其它样式需要设置，也最好显式设定一下宽高为 100%，否则有可能被子元素撑变形而出现偏差，如下案例：

  ```css
  ul.header__bottom__navbar {
      padding-left: 10px;
      overflow: hidden;
      height: 100%;	/* 继承的高度为 38px，若未显式设置为 100%，
      				   则 ul 会被子元素撑高为 39.8px，
      				   与下方的 banner 会有约 1px 的间隙 */
  }
  ```

  ```html
  <ul class="header__bottom__navbar">
      <li><a href="">限时抢购</a><span></span></li> <!--span中引入精灵图，当前位置指示图标-->
      <li><a href="">生活家电</a><span></span></li>
      <li><a href="">苏宁超市</a> <i class="hot"></i> <span></span></li>
      ...
  </ul>
  ```

  