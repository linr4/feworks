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