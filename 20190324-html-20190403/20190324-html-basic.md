### 20190324 - HTML

---



#### HTML Basic Concepts

* 定义：HyperText Markup Language，超文本标记语言；

* 作用：用一些文本（超文本，即：标签）标记另外一些文本的含义/语义（如：哪些是标题、段落等）；

* HTML 文档基本结构：

  ```html
  <html>
      <head>
          <title></title>
      </head>
      <body>
      </body>
  </html>
  ```

* 知识点：

  * 文档字符集：
    * 在`<head>`中使用```<meta charset="utf-8" />``` 指定字符集；
    * GBK vs. UTF-8：
      * GBK 为汉字库以及常用外文，UTF-8 包含几乎世界上所有文字；
    * 文档中指定的字符集需与保存文档文件时使用的字符集一致；
  * 标签分类：
    * 形式：双标签`<p> </p>` vs. 单标签 `<br />` ，`<meta />`；
    * 关系：并列（平级），嵌套（上下级/父子）；
  * DTD 文档声明：
    * 作用：指明 HTML 文档所用的编写规范，让浏览器正确解析和渲染；
    * HTML5 声明格式：`<!DOCTYPE html>`，向下兼容；
    * 注意点：
      * 须写在文档第一行；
      * 不区分大小写；
      * 不是 HTML 标签，而是指明 HTML 版本的指令；
      * 浏览器不完全依赖于DTD，不写也能正常运行，但需遵守W3C规定，应当写上；
  * HTML / XHTML / HTML 5 区别在两方面：语法严格程度以及功能强弱；
    * HTML 语法宽松、容错性强；

    * XHTML 语法严格，如：标签必须小写、严格闭合、标签属性必须引号等；

    * HTML 5 语法仍宽松，并增加更多新特性；

      

---



#### `<h>` 系列标签，以及 `<p>` 和 `<hr>` 标签



* `<h1> </h1>` ：header，定义文本的“标题”语义；

  * 仅用于添加语义，非用于修改样式；
  * 范围h1~ h6，超过6无效；
  * 包裹的内容独占一行；
  * 实际开发中慎用，一个页面只能有一个 H1（基于 SEO 考虑）

* `<p> </p>`：Paragraph，定义文本的“段落”语义，文本独占一个段落；

* `<hr />`：Horizontal Ruler，显示一条分割线，

  * 单独占一行；
  * XHTML 要求单标签闭合，HTML 可以不写；
  * 表示段落级元素之间的主题转换；

* 【补充】WebStrorm 快捷键：

  > Ctrl+Alt+Ins: 创建新文件；
  >
  > Ctrl+D: 复制整行；
  >
  > Ctrl+X: 删除/剪切整行；
  >
  > Ctrl+Alt+T : 文字前后加标签；
  >
  > Ctrl+Shift+↑/↓: 上下移动选中的代码；
  >
  > Ctrl+ -/+ : 折叠/展开光标所在的标签代码；
  >
  > Ctrl+Shift+ -/+ : 折叠/展开选中的代码；
  >
  > Shift+Enter : 快速新建一行；



---



#### HTML 注释（Annotation）

* 格式：`<!-- codes --->` ；
* 快捷键： Ctrl + / ；



---



#### `<img>` 标签

* 不会独占一行；
* src 属性：指定图片地址；
  * 推荐使用相对路径，不用绝对路径；
  * 路径使用反斜杠 / 分隔，以兼容更多 OS 类型；
* 只指定宽高（width/height）其一，会自动等比缩放；
* title 属性：指定鼠标悬停时显示的内容；
* alt 属性：alternate，图片无法显示时，显示的替代提示文字；



---



#### `<br>` 标签

* 不另起一个段落换行；
* 可多个连用，每个换一行；
* 通常换行意味着新起一个段落，开发中更多是用`<p>`换行，更符合语义；



---



#### `<a>` 标签

* 作用：Anchor，控制页面跳转；
* 格式： `<a href="url"> text/image </a>` ；
* href 属性为 url 时，须指定协议 http:// 或 https:// 否则无效；
* href 亦可指定为 本地文件/地址；
* target 属性：控制跳转是否在新页面打开（ _self vs. _blank ）；
* title 属性：指定鼠标悬停时显示的提示文本；



---



#### `<base>` 标签

* 格式：`<base target="_blank">`

* 作用：统一指定当前网页所有 `<a>` 的 target 属性；

* 须写在 `<head> </head>` 中；

  

---



#### 假链接

* 定义：不会跳转的连接；
* 格式：
  *  \# 号 —— 会回到页面顶部；
  * JavaScript: —— 不会回顶部；
* 作用：开发期间用于代替未完成尚未完成的跳转目标页面；



#### 锚点

- 作用：同页面的快速跳转；

- 格式：

  ```html
  <a href="#anchor1"> text </a>
  ……
  <h2 id="anchor1"> </h2>
  ```

- 滚动无动画效果；

- 亦可跳转到其它页面的指导标签位置：

  `<a href="page2.html#anchor2">`



#### 列表标签

- 作用：给一组数据添加列表语义，表示这些数据时一个整体；

- 分类：

  - 无序列表（unordered list）：

    - 数据项无先后之分；
    - 格式：`<ul><li> list item </li></ul>`
    - ul 与 li 是一个整体、需组合使用，ul 下只放 li 标签；
    - 应用场景：新闻列表、商品列表、导航条；

  - 有序列表（ordered list）：

    - 数据项有先后之分；
    - 格式：`<ol><li> list item </li></ol>`
    - `<ol type="1/A/a/I/i">` 可指定序号形式（阿拉伯数字、字母、罗马数字），开发中不会这么用；
    - 应用场景：排行榜；

  - 定义列表（definition list）：

    - 格式：

      ```html
      <dl>
          <dt> title </dt>
          <dd> description </dd>
          <dl> list item </dl>
      </dl>
      ```

    - 作用：给一组数据添加列表语义，数据列表包含标题项 (dt)、描述项 (dd)  ；

    - 应用场景：网站底部页脚信息，图文混排；

    - dt 可以没有对应的 dd，也可对应多个 dd，但推荐 dt / dd 要一对一使用；

    - dt / dd 下可以添加其它标签以丰富内容，但 dl 下只包含 dt 和 dd ；



#### 表格标签

- 作用：给数据添加表格语义；清晰展现大量数据；

- 表格的组成：

  - 表格存储的数据较复杂，对其组成元素做分类，以利于管理和细化语义；
    - 标题 caption
    - 表头 thead
    - 表体 tbody
    - 表尾 tfoot，表格的附加信息

- 完整格式：

  ```html
  <table border="1">
      <caption> table caption </caption> <!-- 可无 -->
      <thead> <!-- 可省略，浏览器自动加 -->
          <tr>
              <th> cell header </th> <!-- 可无 -->
          </tr>
      </thead>
      <tbody> <!-- 可省略，浏览器自动加 -->
      	<tr>	<!-- row / 行 -->
          	<td> data / 列 </td>
      	</tr>
      </tbody>
  	<tfoot> <!-- 可无 -->
          <tr>
              <td> data </td>
          </tr>
      </tfoot>
  </table>
  ```

- table 的属性（开发中均通过CSS调整，不在 table 标签属性中设置）：

  - 边框 border：默认 = 0，没有展示出来；
  - 宽高 width / height：
    - 仅 table / td 使用；
    - thead / tfoot 不继承 table 的 height 属性，需单独设置；
  - 对齐：
    - 水平对齐 align： table / tr / td 均可使用；优先级 td > tr > table；
    - 垂直对齐 valign ： 仅 tr / td 使用；
  - 边距（内/外）：
    - 仅 table 使用；
    - 外边距 cellspacing：默认 =2px，单元格之间的距离；
    - 内边距 cellpadding：默认 =1px，文字与单元格的距离；
  - 细线表格：
    - table 和 tr 设置不同的 bgcolor；
    - table 设置 cellspacing="1px"；
  - 表格标题： caption
    - 紧跟着 table 标签来写；
    - 自动相对于表格居中；
  - 单元格标题： th
    - 与 td 平级；
    - 自动加粗、居中；
  - 单元格合并：
    - 在 td 上添加属性：水平方向 colspan，垂直方向 rowspan；
    - 合并后每一行、每一列的单元格总数需保持一致；
    - 向后、向下合并；

---



#### 表单标签

- 格式：

	```html
	<form>
    	<表单元素>
	</form>
	```
* 常见表单标签

  * `<input>`- 文本框、密码框、单选框、多选框；

    ```html
    <input type="text" value="文本框">
    <input type="passowrd" value="密码框">
    
    <input type="radio" name="gender" value="male"> male
    <input type="radio" name="gender" value="female" checked="checked"> female 
    <input type="radio" name="gender" value="secret" checked> secret
    
    <input type="checkbox" name="hobby" value="swimming"> swimming
    <input type="checkbox" name="hobby" checked="checked" value="bb"> body-building
    
    <!--
    * 一组单选框要设置相同的 name 才会互斥；
    * checked 表示默认选中；一组 radio 多个 checked 时，最后一个生效；
    * 同一组多选框的 name 也需一致，目的是表单提交数据时才知道提交的是什么；
    * 属性与值一样时（如：checked="checked"），可省略值，但 XHTML 不可省，因此推荐不要省；
    * 非文本框的 value 要指定，否则单/多选框的 value 会等于 "on"，不知所云；
    -->
    ```

  * `<input>` - 按钮（普通按钮、图片按钮、重置、提交、隐藏）；

    ```html
    <form action="">
        <input type="button" value="这是按钮" onclick="altert(1)">	// 普通按钮
        <input type="image" src="btn.jpg">	// 图片形式的按钮
        <input type="reset">	// 清空表单数据，有默认标题 “重置”，或通过 value 自定义标题
        <input type="sbumit">	// 提交表单数据，有默认标题 “提交”，或通过 value 自定义标题
        	// 提交需两个条件：
        	// 1) 提交到哪个服务器？ 在 <form action="http://baidu.com"> 指明 action 的值； 
        	// 2) 哪些数据要提交？ 在 <input name="myName"> 标签要指明 name 属性的值；
        	// 输出格式 ——>  https://baidu.com?myName=xxx&pswd=123
        
        <input type="hidden" name="hiddenInfo" value="asdfadf">	
        	// 隐藏域，不会出现在界面上，用于收集用户数据；   
    </form>
    ```

  * `<label>`  - 将输入框和标题文字绑定，点击文字时，输入框也能获得焦点；

    ```html
    <form action="">      
      <label for="user"> 用户：</label> <input type="text" id="user"><br>
      <label for="pswd"> 密码：</label> <input type="password" id="pswd">
          
      <!-- 或者用 label 把 input 包起来 -->
          
      <label> 用户：<input type="text"> </label> <br>
      <label> 密码：<input type="password"> </label>
    </form>
    ```

      

  * `<datalist>`  - 给文本框添加待选项；HTML5 新标签，目前浏览器还未普遍支持；

    ```html
    Enter your car type: <input type="text" list="cars">
    
    <datalist id="cars">
        <option> Mercedes </option>
        <option> BMW </option>
        <option> Audi </option>
    </datalist>
    ```

  * `<input>` - H5 新增类型；

    * `<input type="x">` 

    * x = email, url, number, range, search, color,

    * Date pickers (date, month, week, time, datetime, datetime-local)

      

  * `<select>` - 下拉列表；

    ```html
    <select>
        <optgroup label="Shenzhen">
            <option> Luohu </option>
            <option> Futian </option>
            <option selected="select"> Longgang </option>
        </optgroup>
        
    </select>
    ```

  * `<textarea>` - 多行文本框；

    ```html
    <textarea cols="10" rows="3">
        <!-- 行/列虽已指定，但仍可无限输入文本 -->
    </textarea>
    ```

    ```css
    textarea {
        resize: none;
        /* 控制文本框是否可拉伸 */
    }
    ```

    

---



#### `<video>` 标签

* 格式：

  ```html
  <video src="video.webm"> </video>
  
  <!-- 常用属性：
      src: 
      autoplay: 
      controls: 
      poster: 
      loop: 
      preload: 预加载，与 autoplay 互斥
      muted:
      width:
      height:   -->
  ```

* 第二种格式：

  ```html
  <video autoplay="autoplay" controls="controls">
      <source src="video.webm" type="video/webm"> </source>
  	<source src="video.ogg" type="video/ogg"> </source>
  	<source src="video.mp4" type="video/mp4"> </source>
  </video>
  
  <!-- 
  意义：适配不同浏览器所支持的不同视频格式；
  条件：浏览器需支持HTML5；老浏览器可通过 html5media 框架实现对该标签的支持
  -->
  ```

  

#### `<audio>` 标签

* 与 `<video>` 几乎一样，除了没有 width/height/poster 三个属性；



#### `<details> <summary>` 详情与概要标签

```html
<details>
    <summary> 概要信息 </summary>
    详情信息
</details>

<!-- 详情默认折叠，以节省空间 -->
```



#### `<marquee>` 跑马灯标签

```html
<marquee 
         direction="right/left/up/down" 滚动方向
         scrollamount="1~100" 滚动速度
         loop="1" 滚动次数
         hehavior="slide/alternate" 滚动类型
         > 
    文字内容 / 图片
</marquee>
```



#### 被废弃的标签

* HTML 标签的作用应该只是添加语义，早期部分用于修饰样式的标签现已废弃：

```html
<br> 
<hr> 
<font> </font>
<b> bold == strong </b>			<!-- 替代语义标签： <strong> 定义强调重要性的文字 -->
<u> underline == ins </u>	  	<!-- 替代语义标签： <ins> 定义插入的文字 -->
<i> italic == em </i> 			<!-- 替代语义标签： <em> 定义强调的文字 -->
<s> strikethrough == del </s>   <!-- 替代语义标签： <del> 定义被删除的文字 -->

<!-- 通常不用 <b> <u> <i> <s> 来直接修饰样式，而是作为 CSS 钩子使用 -->
```



#### 字符实体

* HTML 中多个空格、回车、Tab 会被当作一个空格处理；
* 有些字符（如标签的尖括号）被保留，不会直接显示；
* 若要显示，则需通过特殊字符串 —— 字符实体；
  * `&nbsp;` 空格
  * `&gt;` 大于号，`&lt;` 小于号
  * `&copy;` 版权符号
  * 其它字符实体 [参考](http://www.w3school.com.cn/html/html_entities.asp)；