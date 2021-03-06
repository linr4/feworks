20190821



### 属性

###### 字体属性

* 若字体不存在，将使用默认字体，中文简体用宋体；
* 若不想用默认字体，可以设置字体备选方案，格式：`font-family: "font1", "font2", ...;`
* 中文字体都包含了相应英文字体，但反之不然；若要中英文字体分别设置，可以把英文字体座位首选、中文字体作为备选：`font-family: "Time New Roman", "微软雅黑";`，反过来设置不行；
* 实际开发中，常用：宋体 / 黑体 / 微软雅黑，Time New Roman / Arial；
* 字体属性的缩写：`font: style weight size family;`，
  * 例如：`font: italic bold 10px arial;`
  * 注意点：
    * style, weight 可以省略；
    * Style 和 weight 位置可以互换；
    * size 和 family 必须有，否则整个无效；
    * size 和 family 位置不能换，size 必须写在 family 之前，且两者须在另外两个属性之后；

###### 文本属性

* 装饰属性：`text-decoration: underline; / line-through; / overline; / none;`
  * `none` 常用于去除超链接 `<a>` 的默认下划线；
* 对齐属性：`text-align: center; / right; / left;`
* 缩进属性：`text-indent: 2em;`  缩进两个文字



###### 颜色属性

* 格式： `color: value;`

* 属性值的形式：

  * 颜色单词：red / blue / yellow；常见的颜色有定义，通常开发时调试用；
  * 三原色：`rgb(r, g, b)`，亮度 0~255；
  * 三原色带透明度：`rgba(r, g, b, opacity)`，透明度 0~1； CSS3 新特性；
  * 十六进制：#RGB 或 #RRGGBB，取值 0~F 或 00~FF；每种颜色的两位数字如相同，可以简写为一位数，如 RR 可以简写为 R；

* Tips：

  * 实际开发中不常用纯黑色，灰色用的多；

  * 两位数十六进制转为十进制的公式：Hex 第一位数字 * 16 + Hex 第二位数字 = Decimal，

    * 如 3F = 3 * 16 + 15 = 48 + 15 = 63

      

### 选择器

* 标签选择器：`tag {attr: value;}`
* ID 选择器：`#id {attr: value;}` 
  * 文档中的 ID 需唯一，且不能与标签同名；
  * 开发中通常 ID 用来在 JS 中引用 DOM 对象，不会用来设置样式；
* 类选择器：`.className {attr: value;}`
  
  * 多个标签可以共用一个 CSS 类，一个标签也可以绑定多个 CSS 类
* 后代选择器：`tag1 tag2 tag3 {attr: value;}`
  * 选择器标识符之间以空格分隔；
  * 选中父容器下所有命中的元素（儿/孙/曾孙...），无论在哪个层级；
  * 选择器标识符可以是 标签、ID、类名 等；
* 子元素选择器：`parent>child {attr: value;}`
  * 用大于号分隔标识符，之间不能有空格；
  * 只会查找直接下级子元素（亲儿子），不会查找其下嵌套的其它元素；

* 交集选择器：`Selector1Selector2{attr: value;}` 
  * 选择器之间连写、没有分隔符；
  * 例：`div.box1 {color: red;}` div 与 box1 同级；
  * 实际开发中用的不多，交集意味着重复，通过其它更简单的选择器组合通常就能选中目标元素；
* 并集选择器：`selector1,selector2 {attr: vaule;}`
  
* `h1,#id,.box {color: red;}` // 三者都被选中
  
* 兄弟选择器：作用于同级元素（selector 1 和 selector 2 同级）

  * 相邻兄弟选择器 (CSS2)：`selector1+selector2 {attr: val}` // selector2 紧跟 selector1 方能选中
  * 通用兄弟选择器 (CSS3)：`selector1~selector2 {attr: val}` // 选中 selector1 之后所有 Selector2

* 序选择器：作用于同级元素

  ```css
  p:first-child {color: red;}   /* 同级别的第一个p，不区分类型（p必须为同级元素的第一个，如果p之前还有其他类型的元素，则无法选中） */
  p:last-child {color: red;}    /* 同级最后一个p，不区分类型，若p非同级的最后一个标签则无法选中 */
  
  p:first-of-type {color: red;} /* 同级同类的第一个，无论其前有无其他类型元素 */
  p:last-of-type {color: red;}  /* 同级同类的最后一个，无论其后有无其他类型元素 */
  
  p:nth-child(3) {color: red;}  /* 同级的第三个，不区分类型，若第3个非p标签则无法选中 */
  p:nth-of-type(3) {color:red}  /* 同级同类的第三个 */
  
  p:nth-last-child(2) {color:red}   /* 同级倒数第二个p，若倒数第二非p则无法选中 */
  p:nth-last-of-type(2) {color:red} /* 同级同类倒数第二个p */
  
  p:only-child {color: red}   /* p为父元素下的唯一子元素时，选中 */
  p:only-of-type {color: red} /* p为父元素下的唯一p类型的标签时，选中 */
  
  p:nth-child(odd) {color:red}    /* 选中同级奇数位置的元素 */
  p:nth-child(even) {color:red}   /* 选中同级偶数位置的元素 */
  p:nth-of-type(odd) {color:red}  /* 选中同级同类奇数位置的元素 */
  p:nth-of-type(even) {color:red} /* 选中同级同类偶数位置的元素 */
  
  p:nth-child(xn+y) {color:red}   /* n从0递增，2n+0 选中奇数，2n+1选中偶数，X/Y 自定义 */
  ```

  

* 属性选择器：用 [ ] 包裹，根据属性名称找到对应标签的选择器

  ```css
  [attr] {}
  p[id] {color: red} /* 有 id 属性的 p 标签 */
  
  [attr=val] {}	/* 常用于区分 input 标签属性 */
  p[class=cc] {color: red} /* class 属性的值为 cc 的 p 标签 */
  input[type=password] {}
  
  /* 属性取值以什么开头的 */
  [attr|=value]	/*CSS2，字符串需以连字符(-)和其它字符相连方可，空格或无分隔符都不行，不建议用*/
  [attr^=value]	/*CSS3*/
  
  img[alt^=abc] {color: red} /* 以abc开头 */
  
  /* 属性取值以什么结尾的 */
  [attr$=value]
  
  img[alt$=abc] {color: red}
  
  /* 属性取值以包含特定值的 */
  [attr~=value]	/*CSS2，取值字符串需以空格和其它字符分隔方可，不建议用*/
  [attr*=value]	/*CSS3*/
  
  img[alt*=abc] {color:red}
  ```

  

* 通配符选择器：`* {attr:value}` 
  
  * 选中所有标签，若标签多则性能差，实际开发不建议用；



### CSS 三大特性



###### 继承性

* 祖先元素的部分属性（以 color- / font- / text- / line- 开头的）也会应用于后代元素；

* 特例：

  * `<a>` 标签的文字颜色和下划线不会继承自祖先元素；
  * `<h>` 标签的文字大小不会继承自祖先元素；

* 应用场景：用于设置网页的共性信息，文字颜色、字体、大小等；

  

###### 层叠性 （Cascading）

* CSS 处理冲突的机制，如：多个选择器选中同一标签、设置同一属性时，如何处理；



###### 优先级

* 多个选择器选中同一标签、设置同一属性时，由优先级确定生效设置；

* 判断优先级的三种方式

  * 直接选中的选择器优先生效；若为间接选中（继承而来），离目标近的的选择器生效；

  * 直接选中且选择器相同，则写在后面的生效；

  * 直接选中但选择器不同，则按选择器优先级确定层叠；

    * ID > 类 > 标签 > 通配符 > 继承 > 浏览器默认

      

* 属性优先级提升：属性值的后面加上 `!important` （分号之前）

  * 例：`p { color: green !important;}`

  * 只能用于直接选中的选择器；

  * 通配符也是直接选中，`* {color: red !important;}`

    

* 优先级之权重：多个选择器混用时，通过计算权重确定优先级；

  ```css
  /* 三个选择器都直接选中同一个元素，哪个生效？ */
  
  #id1 .box2 {
      color: red;
  }
  
  .box1 .box2 {
      color: green;
  }
  
  div ul li p {
      color blue;
  }
  ```

  * 优先计算 ID 个数，ID 个数多的权重高；
  * 若 ID 个数一样，则类名个数多的权重高；
  * 若类名个数一样，则标签名个数多的权重高；
  * 若以上因素的个数都一样（优先级一样），则不再计算，写在最后的选择器生效；
  * 直接选中元素的选择器才有计算权重的需要，间接选中的优先级必定低于直接选中；
  * 通配符选择器权重为 0，即不参与权重计算；
  * `!important` 优先级最高，override 以上所有计算；



### CSS 显示模式

* `<div>` vs. `<span>`
  * `<div>` 是容器标签（HTML 对标签的分类），可嵌套其它任何标签；如：div h ul ol li dt dd dl ...
  * `<span>` 是文本标签，只能嵌套 文字、超链接、图片；如：span p buis strong em ins del ...
  * `<div>` 布局网页全局结构， `<span>` 修饰局部；
* 块级元素 vs. 行内元素（CSS 对标签/元素的分类）
  * 块级：
    * 独占一行；
    * 如：p div h ul ol li dt dd dl ... <font color=red>留意 `<p>` 是 HTML 文本标签、却是 CSS 块级元素</font>；
    * 若没有设置宽度，则与父元素同宽；若设置了宽度，则按设置的宽度显示；
  * 行内：
    * 不会独占一行；
    * 如：span buis strong em ins del ... （没有 p）；
    * 无法设置宽高，与内容同宽高；
  * 行内块级元素：
    * 既不独占一行、又可以设置宽高；

* 显示模式的转换
  * `display: block;`
  * `display: inline;`
  * `display: inline-block;`



### background

* `background-color: rgb() / rgba() / #xyz / red;`
* `background-image: url()`
  * 本地或网络图片均可；
  * 图片和其它代码分开发送请求；
  * 图片若小于父元素，则默认水平填充；
* `background-repeat: repeat / no-repeat / repeat-x / repeat-y`
  * 控制背景图片平铺方式
  * 默认 `repeat`
  * 应用场景：有规则的小图做背景平铺，就不用整张大图了，可以加快网页加载速度；

* `background-position: x y;`
  * 控制背景图位置；
  * 取值可为方位名词（left center right / top center bottom）或像素；
  * 默认 `background-position: left top;`
* `background-attachment: scroll / fixed;` 
  * 背景图片与滚动条的关联方式，确定背景图是否随页面滚动；
* 简写格式：`background: color url() repeat attachment position;`
  * 任何一个属性都可省略，只保留一个；

* `background` vs. `<img>`
  * 背景图片不占用位置，而 img 会占用位置；
  * 背景图片有定位属性，方便定位；img 无定位属性，定位不方便；
  * img 语义强于背景图片，若图片需被搜索引擎收率，推荐用 img；



### 盒子模型

###### 边框

* 四条边一起写：`border: width style color;` 
  * style 有：dotted, dashed, solid, double, groove, ridge, inset, outset；
  * style 不能省略，其它两个要素可以；省略之后，width 默认 1，color 默认黑色；
* 四条边分别写：
  * `border-top: with style color;` 
  * 还有 border-left / border-right / border-bottom 一样写法；
* 三要素分别写：
  * `border-width: 四条边一样的宽度;`   或
  * `border-width: 上 右 下 左;`
  * `border-color` 和 `border-style` 一样的道理；
* 【上右下左】取值省略时的规律：
  * 只写【上、右、下】三个，则左右一样；
  * 只写【上、右】两个，则左右一样、上下一样；
  * 只写【上】，则四边一个样；

* 分别设置四条边各自的属性的写法：

  ```css
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: turquoise;
  ...
  border-left-width: 2px;
  ...
  border-right-style: dashed;
  ...
  border-bottom-color: orangered;
  ...
  ```

* 画三角形箭头（向下）：

  ```css
  div {
      width: 0;
      height: 0;
      border-width: 50px;
      border-style: solid;
      border-color: red transparent;
      border-bottom: none;
  }
  ```

  

###### 边距

* 内边距 padding：
  * 边框和内容之间的距离；
  * 默认情况下，设置 padding 会撑大盒子；
  * padding 也会有颜色，与盒子的 背景色一致；

* 外边距 margin：
  * 标签与标签之间的距离；
  * margin 没有背景颜色；
  * margin 的合并（塌陷）现象：
    * 水平方向的 margin 可以叠加（相邻标签的 margin 数值相加）；
    * 垂直方向的 margin 不会叠加，而是以较大的 margin 为准；



###### 盒子模型

* conclusion
  * 在 HTML 中所有标签均可设置如下属性，与现实中的盒子相似（以手机盒子为例），因此称为盒子模型：
    * 宽高 ---> 默认为存放内容的区域的宽高（手机本身的宽高）；
    * padding ---> 盒子与手机之间的空隙；
    * border ---> 盒子本身的四边；
    * margin ---> 盒子之间的间隙；

* 宽高
  * 内容宽高：通过 width / height 属性设置的值；
  * 元素宽高：width / height + padding + border；
    * 默认情况下，设置 padding 和 border 会增大元素的宽高，可能影响布局；
    * CSS3 新特性：设置 box-sizing 为 border-box，让 width / height 属性从 border 开始计算， 即可不受影响，默认为 content-box；
  * 元素空间的宽高：width / height + padding + border + margin；

* 居中
  * 嵌套的两个盒子，若要使小盒子在大盒子里居中，可以给大盒子加 padding，也可给小盒子加 margin；
  * 大盒子加 padding 的方式，大盒子默认会被撑大，需要设置 box-sizing: border-box;
  * 小盒子加 margin 的方式，在垂直方向，大盒子会随小盒子被顶下来，需要大盒子设置 border；
  * 优先使用 padding 方式，因 margin 主要用于设置兄弟关系的盒子，padding 用于父子关系的盒子；
  * 小盒子水平居中，可以设置 margin: 0 auto; 来实现；
  * `text-align: center;` vs. `margin: 0 auto;`
    * tac 用于设置盒子里的文字和图片等行内标签（inline & inline-block）水平居中，对块级标签无效；
    * m0-a 用于设置盒子本身（块级标签）的水平居中；
  
* 重置默认边距：[YUI CSS reset](https://yuilibrary.com/yui/docs/cssreset/)

  ```css
  /*
  YUI 3.18.1 (build f7e7bcb)
  Copyright 2014 Yahoo! Inc. All rights reserved.
  Licensed under the BSD License.
  http://yuilibrary.com/license/
  */
   html {
      color:#000;
      background:#FFF
  }
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
      margin:0;
      padding:0
  }
  table {
      border-collapse:collapse;
      border-spacing:0
  }
  fieldset, img {
      border:0
  }
  address, caption, cite, code, dfn, em, strong, th, var {
      font-style:normal;
      font-weight:normal
  }
  ol, ul {
      list-style:none
  }
  caption, th {
      text-align:left
  }
  h1, h2, h3, h4, h5, h6 {
      font-size:100%;
      font-weight:normal
  }
  q:before, q:after {
      content:''
  }
  abbr, acronym {
      border:0;
      font-variant:normal
  }
  sup {
      vertical-align:text-top
  }
  sub {
      vertical-align:text-bottom
  }
  input, textarea, select {
      font-family:inherit;
      font-size:inherit;
      font-weight:inherit;
      *font-size:100%
  }
  legend {
      color:#000
  }
  #yui3-css-stamp.cssreset {
      display:none
  }
  ```

  

* 行高：line-height
  
  * 文字默认垂直居中于行高，因此常通过设置行高等于盒子高度来可实现单行文字的垂直居中；若是多行，则需通过设置 padding-top & padding-bottom 实现垂直居中；



### 浮动

* 布局方式：浏览器对网页元素的排班方式

* 三种布局方式：标准流、浮动流、定位流；

  

###### 标准流（文档流/普通流）：

* 浏览器默认排版方式
  * 块级元素：垂直排版
  * 行内、行内块级元素：水平排版

  

###### 浮动流：

* “**半**脱离标准流” 的排版方式；“半” 的原因：元素浮动后的位置，由元素在标准流中的位置来确定。

* 只能水平排版，只能左/右对齐；
  
  * `float: left;` 该元素要与父元素的左边对齐；`float: right;` 该元素要与父元素右对齐；
  
* 不区分元素类型（block / inline / inline-block 是标准流的概念，浮动流中的元素不做这个区分）均可水平排版、设置宽高，与标准流 inline-block 特性相似；

* 无法设置居中，`margin: 0 auto;` 不起作用；

* 浮动元素脱标：元素浮动后，脱离标准流；

  * 元素浮动后，看似元素从标准流中删除，不再遵循标准流排版规则；
  * 若前一个元素浮动、其后的元素没有浮动，则前一个已浮动元素脱离了标准流，空出来的位置由未浮动的后一个元素按标准流排版方式往前移动填充，已浮动的前一个元素会显示在上层、盖住后一个元素；
  
* 浮动元素排版规则

  * 相同方向浮动的元素，先浮动显示在前、后浮动显示在后；

  * 不同方向浮动的元素，左浮动贴靠左浮动、右浮动贴靠右浮动；

    * 元素浮动之后的位置，由元素在之前标准流中的位置来确定；

      * 元素在浮动前是在标准流第一行，浮动后也在第一行；
    * 元素在浮动前是在标准流第二行，浮动后会在第二行；

    * 浮动元素贴靠现象：

      * 当父元素宽度不足以容下所有浮动子元素时，最后一个浮动元素 (n) 会往前一个元素 (n-2) 贴靠；
    * 若还是容不下，会继续往前贴靠，直至贴靠到父元素的水平方向的边界（左或右）；

  * 浮动元素字围现象：

    * 元素浮动后，会覆盖在标准流中未浮动的元素的上层，但被覆盖的标准流元素中的文字会绕着浮动元素排版，文字并不会被覆盖，即为“**字围现象**”；

      * 常用于图文混排：

        ```css
        img {
        	float: left;
          }
        p {
        	border: 1px solid #000;
        	width: 500px;
      	height: 200px;
          }
        ```

        ```html
      <img src="Takeshi.jpg">
        <p>金城武（Takeshi Kaneshiro）</p>
        ```
      
      
    
  * 布局 Tips:
    
    * 实际开发中，水平方向用浮动流布局，垂直方向用标准流布局；
    * 布局过程从上到下、从外到内；
      
    * 同一层的水平布局若较复杂，可分割成左右两个模块来做细节布局；
    * 局部模块若仍较为复杂，仍可继续分割为左右再做更小模块的布局；
    
  * 浮动元素高度问题：
    
    * 标准流中，盒子的高度由其内容的高度撑起；
    
    * 浮动流中，<font color=red>浮动元素不会撑起父元素的高度</font>；若要设置父元素位置，需要指定其宽高；
    
      
    

  ###### 清除浮动：

  * 案例(CSS-130)：分属俩 div 的 6 个 p 在标准流中分列两行，p 浮动后，6 个 p 都贴靠在第一行；

    * 此即为浮动的负面效果，因此需要有清除浮动的操作，以消除浮动带来的负面作用；

      ```html
      <div class="box1">
          <p>para 1</p>
          <p>para 2</p>
          <p>para 3</p>
      </div>
      <div class="box2">
          <p>para 01</p>
          <p>para 02</p>
        <p>para 03</p>
      </div>    
      ```

      ```css
      .box1 {
          background-color: turquoise;
      }
      .box1>p {
          background-color: yellow;
      }
      .box2 {
          background-color: pink;
      }
      .box2>p {
          background-color: orange;
      }
      p {
          border: 1px dotted #000;
          width: 100px;
        float: left;
    }
      ```
    
  * 清除浮动方式一：给父元素设置高度；

    * 如上例，给第一个 div.box1 设置高度，即可实现 p 浮动后仍分列两行；
    
    * 实际开发中，尽量不写高度，因此这个方式实际上用得少；
    
  * 清除浮动方式二：设置容器元素的 `clear` 属性（谁不想贴靠就设在谁身上，通常是后面的）；

      * 给后面的 div.box2 元素添加 `clear` 属性，使其子元素 p 不贴靠到 box1 已浮动的 p 上；

        ```css
        .box2 {
            background-color: pink;
          clear: both;
        }
        ```

  * `clear` 属性取值：
    
    * `none` 默认值，按浮动默认的排版规则（左浮贴靠左浮、右浮贴靠右浮）；
    * `left` ，不要贴靠前面左浮的元素；
    * `right` ，不要贴靠前面右浮的元素；
    * `both` ，不要贴靠前面左浮和右浮的元素；
    * 注意点：元素设置了 `clear` 属性后，`margin` 属性会失效；因此需要如下其它清除浮动的方式；
    
  * 清除浮动方式三：隔墙法；需额外添加无语义的块级元素，实际开发不常用；

    * 外墙法：在需要清除浮动的元素前额外添加一个块级元素，并设置 `clear: both;`

      * 前一个 div 的 margin-bottom 不生效，后一个 div 的 margin-top 可以生效，但通常 margin 不设在这俩 div 上，而是设置到 .external-wall 的 height 中；

      ```css
      .external-wall {
          clear: both;
      }
      ```

      ```html
      <div class="float-left"></div>
      <div class="external-wall"></div>
      <div class="float-left">
      ```

    * 内墙法：把额外添加的块级元素放到前一个 div 的所有子元素的最后，并设置 `clear: both;`

      * 内墙法可以让前一个 div 设 margin-bottom，也可让后一个 div 设 margin-top，还可在额外添加的 div 设置 height； 

      * 内墙法可撑起父元素高度，外墙法则不行；
    
        
    
  * 伪元素选择器：作用 - 在指定标签的内容之前或之后添加一个子元素；

      ```css
      div::before {
          content: 'prefix-';
      }
      div::after {
          content: '-suffix';
      }
      ```

      * 伪元素设置了 `height: 0;` 内容仍会显示，需要设置 `visibility: hidden;` 来隐藏内容；

  * 清除浮动方式四：在前一个 div 上添加 `::after` 伪元素并设置 clear，本质上是内墙法；

    ```css
    .box1::after {
        content: '';
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }
    .box1 {
        *zoom: 1; /* 兼容 IE6 */
    }
    ```

  * 清除浮动方式五：

    * 在前一个盒子中设置 `overflow: hidden;` ，但 IE6 无法支持，需加上 `.box1 {*zoom: 1;}`
    * `overflow: hidden;` 的三个用处：
      * 隐藏盒子中溢出的文字；
      * 清除盒子的浮动，效果与伪元素内墙法一样；
      * 两个嵌套的盒子，父元素设置了 `overflow: hidden;` 可使得子元素能够设置 `margin-top` 且父元素不会被一起顶下来 ，与父元素设置了 border 的效果一样；

  * Tips

    * 水平方向多个元素要顶部对齐，最快捷的方式就是让它们全部浮动；

    * 多重背景图，写在前面的图片会盖住写在后面的图片，因此要显示在上层的得写在前面：

      ```css
      background: url(img1.jpg), url(img2.jgg), url(img3.jpg);
      ```

      

###### 定位流

* 四种定位方式：相对定位、绝对定位、固定定位、静态定位（默认）

* 相对定位：`position: relative;`

  * 相对于该元素在做相对定位之前在标准流中的位置做移动；
  * 不脱离标准流，仍在标准流中占有空间；
  * 相同方向只能设置一个位移值，若同时设置了 top, bottom 或 left, right，只有 top 和 left 生效；
  * 相对定位区分 block / inline / inline-block，位移可以生效，但不会改变元素原有类型；
  * 元素的 margin / padding 以其在标准流中的位置进行计算和起作用，不以相对定位后的位置为准；
  * 应用场景：
    * 微调元素的位置，如输入框与验证码图片之间做对齐；
    * 与绝对定位配合实现元素精确定位、动态居中等效果；

* 绝对定位：`position: absolute;`

  * 相对于 body（的首屏可视区域）为参照点进行定位；

  * 会脱离标准流，不设置位移的话，位置不变；

  * 不区分 block / inline / inline-block，所有元素均可设置宽高；

  * 定位参照点：

    * 默认情况下无论有无祖先元素，均相对于网页首屏可视区域为参照点进行定位；
    * 若祖先元素也有定位流（相对、绝对、固定），则该元素的绝对定位会以离自己最近的有定位流的祖先元素为参照点；
    * 绝对定位元素会忽略有定位流的祖先元素的 padding；

  * 应用场景：

    * 子绝父相：子元素设置绝对定位、父元素设置相对定位，实现子元素相对于父元素做精确定位，且不因网页调整大小而出现偏差；

    * 水平居中：

      ```css
      position: absolute;
      left: 50%;
      margin-left: -eleWidth/2;
      /* 或 */ transform: translateX(-50%);
      ```

* 固定定位：`position: fixed;`  --- IE 6 不支持；

  * 与背景关联方式 `background-attachment: fixed` 类似；
    * 背景关联方式位使得背景图片不随页面滚动；
    * 固定定位使得该元素不随网页滚动；
  * 大部分特性与绝对定位相同：
    * 开启固定定位后，会脱离标准流、不占用标准流的空间；
    * 不区分 block / inline / inline-block，开启后以 block 的方式处理元素；
  * 应用场景：顶部导航条，侧边广告，“返回顶部” 按钮 ……

* `z-index` 属性：

  * 控制定位流元素（标准流元素设置 z-index 无效）的 z 轴层级（覆盖关系），默认值 0 ；
  * 默认情况下，定位流元素会覆盖标准流元素；
  * 对于定位流元素，写在后面的会覆盖写在前面的；
  * 设置了 z-index 的元素，z-index 值大的元素显示在上层；
  * 从父现象：父元素若设置了 z-index，则子元素的 z-index 会失效；



### CSS3 新特性

* 转换模块、过渡模块、动画模块

  

###### 前置知识 - `<a>` 标签伪类选择器

* `<a>` 标签伪类选择器：用于修改 `<a>` 标签各种状态之下的样式
* `<a>` 标签的三种状态：
  * 未访问过 `a:link {}`
  * 已访问过 `a:visited {}`
  * 鼠标悬停 `a:hover {}`
  * 鼠标长按 `a:active {}`
* 若伪类一起出现，需要按 <font color=red>L</font>ink -> <font color=red>V</font>isited -> <font color=red>H</font>over -> <font color=red>A</font>ctive 的顺序编写 `LoVe & HAte`
* 若 `a:link {}` 和 `a:visited {}` 的样式相同，可以简写为 `a {}`
* 写代码 Tips：
  * `a {}` 写在前面、`a:link {}; a:visited {}; a:hover {}; a:active {}` 写在后面；
  * 盒子相关的属性（显示模式、宽高、边距等）写在 `a {}` 中，文字、背景等相关属性写在伪类中；



###### 过渡模块 `transition`

* 三要素：
  * 创建：通过元素的伪类设置属性的变化，如：`div:hover {width:30px, bgc:red}`；
  * 绑定：在元素样式中指明要执行过渡的属性，如：`div {transition-property: width, bgc;}`
  * 时长：在元素样式中指明过渡的执行时长，如：`div {transition-duration: 5s, 3s;}`
* 其他属性：
  * `transition-timing-function` 过渡效果执行的时间曲线，默认 ease；
    * `linear` 匀速，等于 `cubic-bezier(0,0,1,1)`
    * `ease` 慢-快-慢（逐渐慢下来），等于 `cubic-bezier(0.25,0.1,0.25,1)`
    * `ease-in` 慢速开始（加速），等于 `cubic-bezier(0.42,0,1,1)`
    * `ease-out` 慢速结束（减速），等于 `cubic-bezier(0,0,0.58,1)`
    * `ease-in-out` 慢速开始+慢速结束（先加速在减速），等于 `cubic-bezier(0.42,0,0.58,1)`
    * `cubic-bezier(n,n,n,n)` 在该函数中自定义，取值 0 ~ 1；
  * `transition-delay` 过渡效果延迟多久开始，默认 0；
* 简写形式：
  * `transition: property duration [timing-function] [delay];` 后两个可省略
  * `transition: prop1 dur1 tf1 delay1, prop2 dur2 tf2 delay2...`
  * `transition: all 2s;`    所有有变化的属性都要做过渡效果；

* 编写套路：
  * 不管过渡，先写基本样式
  * 再编写需要修改的属性的样式（如 hover）
  * 最后给被修改的属性添加过渡效果

* 案例：手风琴效果

  * 实现的关键点在于设置如下两个样式：

  ```css
  /* 鼠标悬停于整个 ul 时，缩小所有 li 的宽度 */
  ul:hover li {
      width: 126px;
  }
  
  /* 鼠标悬停时，增加所在的 li 的宽度；
  这个样式监听了 li:hover，优先于 ul:hover，因此实现了其它 li 缩小、当前 li 加宽的效果 */
  ul li:hover {
      width: 295px;
  }
  ```




###### 2D 转换模块

* 格式：`transform: translate(x, y) rotate(45deg) scale(x, [y])`

* 转换会修改坐标系，如旋转之后，做 translate() 就不是水平或垂直平移，而是按坐标系倾斜的方向移动；

* `scale(x,[y])` 中的 y 可省略，默认 y = x ；

* 形变中心点：`transform-origin` 
  * 元素默认以自己的中心点为圆心做旋转，`transform-orgin` 用于修改旋转圆心的位置；
  * 格式：`transform-origin: x y;` 坐标 (0, 0) 左上角，(50%, 50%) 或 (center center) 中心点；
  * 坐标值可以是：像素、百分比、关键字（left, center, right, top, bottom）；

* 旋转轴向：元素旋转轴，x / y / z

  * `rotate()` 默认 Z 轴，与 `rotateZ()` 一样；

  * `rotateX()` 、`rotateY()`，与 `perspective: length;` 配合才有明显效果；

  * `perspective: length;` 透视效果

    * 近大远小，length 表示与物体的距离，越小越明显；

    * 需添加到做转换的元素的父元素或祖先元素上；

      

* Other Tips：`<li>` 要横向排列，除了 `float: left;` 之外，也可 `display: inline-block;` 同样效果；



###### 阴影
- 盒子阴影
	- `box-shadow: <h-shadow> <v-shadow> [blur] [spread] [color] [inset];`
	- `h-shadow`：水平偏移，像素，可为负值；
	- `v-shadow`：垂直偏移，像素；
	- `blur`：模糊度，像素；
	- `spread`：阴影扩展，像素；类似光晕，就像水滴在纸上之后往外渗；
	- `color`：阴影颜色
	- `inset`：内阴影（默认 outset 外阴影）；
	- 通常只需指定三个参数：`box-shadow: 10px 10px 10px;` 
		- 阴影颜色默认跟随盒子内容的颜色；
	
- 文字阴影
	- `text-shadow: h-shadow v-shadow [blur] [color]`，没有 `spread` 和 `inset`；
	- 颜色也可省略，默认和文字同色；



###### 动画模块

* 与过渡（Transition）的区别：过渡模块需要人为触发，动画模块可以自动执行；
* 三要素：(CBD - Create, Bind, Duration)
  * **创建**动画模块：`@keyframes aniMoveEl {from {margin-left: 0;} to {margin-left: 100px;}}`
  * **绑定**动画模块到元素：`div {animation-name: aniMoveEl;}`
  * 指定动画的执行**时长**：`div {animation-duration: 2s;}`
* `animation` 的其它属性：
  * `animation-delay` 延迟执行开始时间，默认 0；
  * `animation-timing-function` 执行的速度曲线，默认 ease；
  * `animation-iteration-count` 动画播放次数，默认 1；无限次 infinite；
  * `animation-direction` 规定动画是否在下一个周期逆向执行
    * 默认 normal，每次都原始位置开始；
    * alternate，原路返回、往复运动；
  * `animation-play-state` 规定动画播放或暂停，默认 running；暂停 paused；
  * `animation-fill-mode`  规定动画在执行之前和之后的样式（状态）；
    * `none` 默认，不改变行为；
    * `forwards` 动画完成后，保持在最后一帧的属性值；
    * `backwards` 在 `animation-delay` 指定的时间内、动画执行前，应用第一帧的起始属性值；
    * `both` 上述两者皆生效；

* 创建动画的两种方式：
  * `@keyframes aniName {from { } to { }}`
  * `@keyframes aniNmae {0% { } 10% { } 20% { } ... 100% { }}`

- 连写：`animation: name duration timing-function delay iteration-count direction fill-mode`

  - 可以简写为 `animation: name duration`，其余可以选择使用或省略；
  - `delay` 即使为 0 也要加上单位 0s 或 0ms，否则整个语句不能生效；

- Tips：

  - `@keyframes` 中设置的属性会覆盖的元素样式中写的属性，若有重复，需一并写在`@keyframes` 中；
  - 动画中不变的属性写在前面、有变化的写在后面；否则达不到预期效果；

  ```css
  @keyframe rotate-box {
      from {
          transform: rotateX(-10deg) rotateY(0deg); /* rotateX() 始终不变，写在前面 */
      }
      to {
          transform: rotateX(-10deg) rotateY(360deg);
      }
  }
  ```

- 案例总结：

  - 图片无限滚动轮播：

    - HTML 结构：`div>ul>li*n>img` ，最外层套一个 `div` 的目的，是让 `div` 限定可视图片区域，同时还让 `ul` 可以设置一个足够宽的宽度以便容下所有 `li` 横排；如果把可视区域直接设在 `ul` 上的话， `li` 无论采用何种方式（`dib`, `fl`, `poa`, etc.）都无法全部横排、也就无法实现跑马灯的效果；

    - 图片总数为 M、可视区域显示的图片数量为 N 时，则需要在 `li` 中嵌入的图片数量为 M+N，最前面的 N 张重复放在最后面，以便在动画播放完一个周期之后跳转到第一个 `li` 时不会有明显的跳动；

      ```html
      <!-- 可视区域初始状态展示2张图片，共有4张图片；需把前2张图重复放到最后，以便完成一个播放周期之后、ul 跳转到起始位置时，出现明显的视觉跳动 -->
      
      <div>
          <ul>
              <li><img src="images/1.jpg" alt=""></li>
              <li><img src="images/2.jpg" alt=""></li>
              <li><img src="images/3.jpg" alt=""></li>
              <li><img src="images/4.jpg" alt=""></li>
              <li><img src="images/1.jpg" alt=""></li>
              <li><img src="images/2.jpg" alt=""></li>
          </ul>
      </div>
      ```

    - 鼠标悬停在图片上时，实现当前图片正常显示、其余图片出现蒙版效果的方法：

      ```css
      ul>li {
          background-color: black; /* 先设置 li 背景色为黑色 */
      }
       
      ul:hover {
          animation-play-state: paused; /* 鼠标悬停时，暂停播放动画 */
      }
      ul:hover>li>img {
          opacity: .5;   /* 鼠标悬停时，设置所有图片为半透明，露出 li 部分底色，实现蒙版效果 */
      }
      ul:hover>li>img:hover {
          opacity: 1;    /* 鼠标悬停时，设置当前图片为不透明，该设置具体到某张图片、priority 高于上一条、因此 override 上一条的设置，图片仍正常显示 */
      }
      ```



###### 3D 转换模块

* 启用 3D 效果：父元素添加 `transform-style: preserve-3d` 属性；

* 正方体：`ul>li*6`，通过 `transform: rotateX() translateZ()` 做转换，每个面旋转角度+90；

* 长方体：先做出正方体，再添加 `transorm: scale()` 拉伸 “前后上下” 四个面的长度即可；

  ```css
  ul {
      position: relative;
      transform-style: preserve-3d;
  }
  ul>li {
      position: absolute;
      left: 0;
      padding: 0;
  }
  ul>li:nth-child(1) {
      background: tomato url('images/1.jpg') no-repeat 0 0;
      transform: rotateX(90deg) translateZ(100px) scale(2, 1);
  }
  ul>li:nth-child(2) {
      background: skyblue url('images/2.jpg') no-repeat 0 0 ;
      transform: rotateX(180deg) translateZ(100px) scale(2, 1);
  }
  ul>li:nth-child(3) {
      background: yellowgreen url('images/3.jpg') no-repeat 0 0;            
      transform: rotateX(270deg) translateZ(100px) scale(2, 1);
  }
  ul>li:nth-child(4) {
      background: seagreen url('images/4.jpg') no-repeat 0 0;            
      transform: rotate(360deg) translateZ(100px) scale(2, 1);
  }
  ul>li:nth-child(5) {
      background-color: turquoise;
      transform: rotateY(-90deg) translateZ(200px);
  }
  ul>li:nth-child(6) {
      background-color: pink;
      transform: rotateY(90deg) translateZ(200px);
  }
  ```

  

###### 背景属性

* 背景图片尺寸属性：`background-size` ，规定背景图片的大小；

  * 取值：

    * 默认：图片实际大小；

    * 像素：`background-size: 100px 100px;` 或 `background-size: 100px;` 

    * 百分比：`background-size: 50% 50%;` 或 `background-size: 50%;` 

    * 宽度等比拉伸：`background-size: auto 200px;` 或 `bgz: 200px;` ，另一个默认 `auto`；

    * 高度等比拉伸：`background-size: 200% auto;` 或 `bgz: 200%;` ，另一个默认 `auto`；

    * cover：等比拉伸，宽或高较短的一边也需填满元素；

    * contain：等比拉伸，宽或高有一边填满元素即可；

      

* 背景定位图片定位区域属性：`background-origin`，规定背景图片在什么位置开始显示；

  * 取值：

    * `padding-box`：从 `pedding` 区域开始显示，默认；

    * `content-box`：从 `content` 区域开始显示；

    * `border`：从 `border` 区域开显示；

      

* 背景颜色绘制区域属性：`background-clip`，规定背景颜色从哪里 (border, padding, content) 开始填充；
  * 取值：
    * `border`：从 `border` 区域开绘制，默认
    * `pedding-box`：从 `pedding` 区域开始绘制
    * `content-box`：从 `content` 区域开始绘制



* 多重背景图片：

  * 格式：`background-image: url(pic1.png), url(pic2.png), ...`

  * 连写：`background: url(1.jpg) no-repeat 0 0, url(2.jpg) no-repeat right top;`

  * 图片多的话，可拆开写：

    ```css
    background-image: url(1.jpg), url(2.jpg), url(3.jpg), ...
    background-repeat: no-repeat, no-repeat, no-repeat, ...
    background-position: 0 0, left bottom, right top, ...
    ```

    

###### CSS 代码引入方式

* 四个引入 CSS 代码的方式
  * 行内样式：`<div style="color=red"> This is a div </div>`
  * 嵌入样式：`<head><style> div {color: red} </style></head>`
  * 外链样式：`<head><link rel="stylesheet" href="css/style.css"></head>`
  * 导入样式：`<head><style> @import "css/style.css" </style></head>`
* **外链**样式在实际开发中常用，与嵌入和行内相比，结构与样式分离，便于维护；
* **导入**样式在 CSS 2.1 推出，不兼容早期浏览器；
* **导入**样式会先加载 HTML 再加载 CSS，而外链样式则先加载 CSS 再加载 HTML，导入样式的用户体验稍差；



###### 编写新站点的步骤

* 创建站点文件夹，下面再创建 `index.html, images/, css/base.css, js/` ；
* 重置默认样式（参考 YUI CSS Reset），设置全局样式；
* 确定网页结构，顶部、导航、广告、商品内容、底部等；



###### More Tips

* 超宽图片（如：banner）的居中方法：

  1. 父元素 `text-align: center;`
  2. 图片 `height: 100%;`
  3. 图片 `margin: 0 -100%;`

  ```html
  <div>
      <img src="images/banner.jpg">
  </div>
  ```

  ```css
  div {
      width: 100%;
      height: 600px;
      text-align: center; /* 关键点：容器要设置(inline)子元素水平居中对齐 */
  }
  div img {
      height: 100%;      /* 设置高度为图片本身的高度 */
      margin: 0 -100%;   /* 关键点：左右 margin 为 -100%， */
  }
  ```

  

###### 边框圆角

* `border-radius: left-top right-top right-bottom left-bottom;`
* 本质：若 left-top 值为 100px，则以 left: 100px 和 top: 100px  的相交点为中心点，画 1/4 弧线；
* 取值亦可为百分比，即为元素边长的百分比，如：设置 左上角 的圆角值为 15%，就分别取左边线和上边线的长度的 15% 的相交点作为中心点画弧线；
* 元素是正方形，画的线是正圆弧；长方形则为椭圆弧；
* 省略了某一个角后，会参考对角的设置；只设置一个值，则其余三个参考它的值；
* radius 值 > border 宽度时，内外边框都变为圆角；radius <= border 时，边框外圆内方；



###### 边框图片

* `border-image: image-source image-height image-width image-repeat`
* Refer to [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)
* 应用场景：替代滑动门（3 张背景图拼成边框）来做边框背景；
  * `border-image: url('nav.jpg') 20 fill repeat;`



###### vertical-align

* 作用：设置行内元素的垂直对齐方式；
* 六条线：
  * 基线 `baseline`：一行文字中高度最小的字符的底部（如：x）；
  * 中线 `middle`：x 的中间（不是文字顶部和底部之间的中线，而是最矮文字 x 的中线）；
  * 文字顶部 `text-top`：一行文字当中，高度最高的文字的顶部；
  * 文字底部 `text-bottom`：一行文字当中，高度最高的文字的底部；
  * 盒子顶部 `top`：文字内容撑起、或 `line-height` 撑起的盒子的顶部；
  * 盒子底部 `bottom` ：参考顶部的定义；
* 特点：
  * `text-align` 在父元素上设置、对子元素生效，而 `vertical-align` 设置在需要对齐的元素本身；
  * `vertical-align` 只对行内元素有效；
* 六种对齐的情况：
  *  `img {vertical-align: baseline;}`：图片与同一行文字的基线对齐，默认；
  * `img {vertical-align: top;}` 与盒子顶部对齐；
  * `img {vertical-align: bottom;}` 与盒子底部对齐；
  * `img {vertical-align: text-top;}` 与文字顶部对齐；
  * `img {vertical-align: text-bottom;}` 与文字底部对齐；
  * `img {vertical-align: middle;}` 与中线对齐；



###### 颜色渐变

* 线性渐变：`linear-gradient([to direction] | [deg], color1, color2, color3, ... colorN)`

  ```css
  /* 渐变方向的两种写法 */
  background: linear-gradient(to left top, orange, blue);
  background: linear-gradient(45deg, red, purple);
  ```

  * 颜色至少 2 个，没有上限；
  * 纯色范围由 CSS 自动计算，亦可手动指定，如 `red 100px`
  * 渐变色的范围也可指定，即在第二个颜色后面加上渐变色的范围 `red 100px, blue 50px`；除了第一个颜色之后指定的是纯色范围，其余的颜色后面指定的均为渐变色范围；
  * `-webkit-background-clip: text;` 把背景裁剪为文字的形状，私有属性，chrome/safari 才有；

* 径向渐变：`radial-gradient([100px][at top left] | [at 10px, 20px], color1, color2, ...)`



### 弹性布局

* 概念：
  * flex container：设置 display: flex 的容器元素；
  * flex items：容器里的子元素；
  * main axis：主轴，默认为横向；
  * cross axis：交叉轴（侧轴），默认为竖向；
  * flex-start / flex-end：主轴/交叉轴的起点和终点，默认为 左/上 和 右 / 下；

* `flex-direction: row(默认) | row-reverse | column | column-reverse;` 主轴的方向；
* `justify-content: flex-start(默认)|flex-end|center|space-between|space-around;` 项目在主轴方向的排版方式；
  * `space-between`：两端对齐，项目之间的间隔都相等；
  * `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍；

* `align-items: flex-start(默认)|flex-end|center|baseline|stretch;` 在交叉轴上的对齐方式；
  * 没有两端对齐 `space-between` 和环绕对齐 `space-around`；
  * `baseline` 为第一个 item 中的文字的基线；
  * `stretch` 拉伸 item 的高度使其等于交叉轴的高度；item 不能设置高度，否则 stretch 失效；
* `align-self:` 单独设置某个 item 的在交叉轴上的对齐方式；取值与 `align-items` 一样；

* `flex-wrap: wrap|wrap-reverse|nowrap(默认)`  默认不换行，即使 item 设置了宽度也会被等比压缩放在同一行；
* `align-content:flext-start|flex-end|center|space-between|space-around|stretch(默认)` 换行之后的对齐方式；
  * `flex-start` 整体（多行）与交叉轴起点对齐；其它选项同理；
  * `stretch` 拉伸各行的行高，使其填满整个 flex container；

* `order: 0(默认)` 调整 item 的排列位置，数字越小也靠前；
* `flex-grow: 0(默认不扩充)` 当 item 宽度总和小于 container 时，设置 item 宽度的扩充方式；前提是 flex-container 足够宽才有效；
  * flex container width - items' total width = width left
  * width left / items 份数 = 每份的宽度；
  * item 原有宽度 + 每份宽度 x 份数 = item 最终宽度

* `flex-shrink: 1(默认等比缩小)` 当 item 宽度总和大于 container 时，设置缩小 item 的方式；前提是 item 宽度总和大于 flex-container 才有效；0 不缩小；
  * 溢出宽度 = total items width - container width
  * 权重 = 份数 x item1 width + ...... 所有 item 份数和其宽度相乘之后的总和
  * 每个 item 需要缩小的数值 = 溢出宽度 * item 宽度 * 份数 / 权重；份数数字越大、缩小得越多；
  * 以上提及的 “宽度” 实际上为主轴上的值；主轴的方向若为 column 则该值就是 “高度”；

* `flex-basis`  设置 item 的宽度；
  * flex 布局中 width 若为设置则其宽度由内容撑开；
  * flex-basis 优先于 width 设置，同时设置的话则以 flex-basis 为准；
  * 取值与 width 一样（auto, px, %），默认为 auto，此时若 width 有设置具体值则以 width 为准；

* `flex: flex-grow flex-shrink flex-basis ` 三个属性的简写形式，
  * 默认 `flex: 0 1 auto`；
  
  * 快捷值：`flex: auto` = `flex: 1 1 auto`，`flex: none` = `flex 0 0 auto`；
  
    ```css
    /* flex-grow: 1;   /* 等比放大 */
    /* flex-shrink: 1; /* 等比缩小 */
    /* flex-basis: 0%; /* 宽度平分 */
    
    flex: 1;  /* 等于上面三条的缩写 */
    ```
  
    



### 常用布局

###### 圣杯布局

* 纵向三栏布局，左右两栏固定宽度，中间一栏随父容器的宽度变化；

  * 创建圣杯布局的步骤：
    * 创建一个容器，包含 3 个子元素盒子： `div.box>div*3`
    * 设置两侧盒子为固定宽度：`width: 200px`；
    * 设置中间盒子宽度等于父容器宽度：`width: 100%`；
    * 设置父容器左右内边距等于两侧盒子宽度：`padding: 0 200px`；
    * 设置3个小盒子在同一方向上浮动；
    * 设置左边盒子：`margin-left: -100%` 把它拉回第一行，left 与中间盒子重叠；
    * 通过定位左移左边盒子，使其不要盖住中间盒子：`position: relative; left: -200px`；
    * 设置右边盒子左边距=自身宽度：`margin-left: -200px`  把它拉回第一行，right 与中间盒子重叠；
    * 通过定位右移右边盒子，使其不要盖住中间盒子：`position: relative; right: -200px`；
    * 设置父容器的最小宽度，使其在窗口缩小时，布局不变形：`min-width: 400px`；

  ```html
  <div class="grail">
      <div class="cont">中间内容</div>
      <div class="navi">左侧导航</div>
      <div class="aside">右侧边栏</div>
  </div>
  ```

  ```css
  div {
      width: 600px;
  }
  .grail {
      min-width: 400px;
      padding: 0 200px;
  }
  .cont, .navi, .aside {
      float: left;
  }
  .cont {
      width: 100%;
  }
  .navi {
      width: 200px;
      margin-left: -100%;
      position: relative;
      left: -200px;
  }
  .aside {
      width: 200px;
      margin-left: -200px;
      position: relative;
      right: -200px;
  }
  ```

  * 内容区域放在前面，是因为内容区域包含图片等较多内容，放前面可以优化加载表现，提升用户体验；

    

###### 双飞翼布局

* 圣杯布局的升级版，也是两侧固定宽度、中间活动宽度的三栏布局；

* 区别在于实现方法上做了优化，不再需要通过定位去调整两侧盒子的位置，而是通过中间盒子再套一个小盒子撑出两个侧边栏的位置，代码更简洁；

  ```html
  <div class="wrapper">
      <div class="content">
          <div class="content-inner"></div>
      </div>
      <div class="navi"></div>
      <div class="aside"></div>
  </div>
  ```

  ```css
  div {
      height: 500px;
  }
  
  .content {
      width: 100%;
  }
  .content-inner {
      margin: 0 200px;
  }
  .navi {
      width: 200px;
      margin-left: -100%;
  }
  .aside {
      width: 200px;
      margin-left: -200px;
  }
  .content, .navi, .aside {
      float: left;
  }
  ```




#### 综合练习中的 Tips

* 快捷图标（收藏图标）favicon.ico 通常在网站根目录下，通过 link 标签引入：

  ```html
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  ```

* 初始化 CSS 样式表的两个常用模板：

  * YUI reset.css：一刀切地清除系统默认样式
  * normalize.css：保留有价值的系统默认样式，修复不同浏览器的兼容性/一致性的 bug

* 自定义的全局样式写在 base.css 中，如浮动、清除浮动、字体、颜色等；

* `object-fit: cover;` 把视频等比拉伸填满父元素，与 `background-size: cover;` 类似；用于动态视频背景填满整个窗口；

* 左浮动的元素不要设置 `margin-left`，可以设置 `margin-right`；

* 图片标签 `<img>` 默认顶部对齐 `vertical-align: top` ，会导致其容器的底部有 1px 间隙，将图片设置一下 `vetical-align: bottom` 即可修正；

* flex 布局，ul>(li>img)*4 结构中的 img 若宽度比较大，会导致即使 li 设置了 flex:1 也只能显示 3 个 li，最后一个超出可视区域的右侧；此时需要设置 li {overflow: hidden}，即可使得 4 个 li>img 显示在可视区域；



### CSS3 媒体查询

* 根据浏览器宽度设置相应样式，实现响应式页面

* 常用于结构较简单的页面，若页面复杂则需要调整的元素太多，通常不会这么用；

* 格式：

  * 内联格式：@media 条件 { }，逻辑上类似于 if ( ) { }

    ```css
    /* screen 表示电脑、平板、手机等显示设备 */
    @media screen and (min-width: 1200px) {
        div {
            width: 1000px;
            height: 500px;
            background-color: red;
        }
    }
    @media screen and (max-width: 1199px) {
        div {
            width: 768px;
            height: 400px;
            background-color: turquoise;
        }
    }
    ```

    

  * 外链格式：`<link rel="stylesheet" href="css/xxx.css" media="条件">`

    * 宽度只供参考，实际开发中需根据实际需求来确定；
    * 通常在引用 PC 版本的 CSS 文件时，不写媒体查询，以便相同样式的代码可以在平板和手机上复用；如果写了媒体查询，当条件不满足时，所有样式都不生效，用户看到的是没有样式的HTML；
    * CSS 引入的顺序必须为 电脑、平板、手机，以便跨设备相同的代码可以复用，而平板和手机的不同代码可以覆盖，否则达不到效果；

    ```html
    <!-- 不同设备引用不同的 CSS 文件 -->
    
    <!-- 电脑 -->
    <link rel="stylesheet" href="css/index-pc.css" media="screen and (min-width=1200px)">
    <!-- 电脑版本的通常不写媒体查询语句、以便代码可以在平板和手机上复用，不必再写一次相同代码 -->
    <link rel="stylesheet" href="css/index.css">
    
    <!-- 平板 -->
    <link rel="stylesheet" href="css/index-pad.css" media="screen and (max-width=1199px)">
    <!-- 手机 -->
    <link rel="stylesheet" href="css/index-phone.css" media="screen and (max-width=768px)">
    ```

* 实际开发中编写响应式页面的步骤：

  * 编写电脑版本的CSS；
  * 再编写平板版本的CSS，通过相同的选择器覆盖不同的样式；
  * 最后编写手机版本的CSS，也是通过相同的选择器覆盖掉不同的样式；

* 注意点：

  * 覆盖样式时，最好通过源码或浏览器 inspect > element > style 获取一模一样的选择器名称，以防因为优先级/权重问题导致后面写的选择器无法生效；
  * <font color=red>最底部左侧版权/法律声明版块及右侧 "关于vivo/中国" 版块的处理：</font>
    * 处理目的：在页面收窄的过程中，左侧版权声明版块的文字在宽度不够时会自动换行，右侧则始终保持在第一行；
    * 处理方法：
      * 在 HTML 中，把右侧版块的代码放在左侧版块的上面；如果右侧版块代码放在下面，则会在版面收窄、宽度不够之后自动换到第二行，无法实现始终保持在第一行的目的；
      * 在 CSS-PC 中，左侧版块左浮、右侧版块右浮；
      * 在 CSS-PAD 中，左侧版块取消浮动 `float: none`，右侧仍保持右浮；如此，由于字围现象（浮动元素不会覆盖标准流中的文字和图片），左侧的文字图片在宽度不够时自动换行，且不会被右侧版块所覆盖。

