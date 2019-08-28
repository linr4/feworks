20190821



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

      

###### 选择器

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



next 73