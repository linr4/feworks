20190821



* 若字体不存在，将使用默认字体，中文简体用宋体
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