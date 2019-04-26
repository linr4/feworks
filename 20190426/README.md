### JavaScript DOM & BOM

--- from 20190426



#### 开篇

* 什么是 window：是一个全局宿主对象，代表浏览器窗口，每个窗口都是一个 window 对象；

* 什么是 document：
  * 是 window 的一个属性，也是一个对象；
  * 代表当前窗口中的整个网页；
  * 通过 document 对象即可操作整个网页的内容；
* 什么是 DOM：
  * Document Object Model，可以大致理解为 DOM 就是 document 对象；
  * DOM 定义了访问和操作 HTML 文档的标准方法；
  * 学习 DOM 既是学习如何通过 document 对象操作网页上的内容；
  * HTML 标签也称为 DOM 元素；
  * 使用 document 对象时，可以直接引用，不用写成 window.document；



#### 获取 DOM 元素

* 通过 ID 获取指定元素： `getElementById()`

  * ID 不能重复、只能绑定指定元素，获取时会把 DOM 元素包装成宿主类型的对象；
  * 找不到就返回 Null；

  ```js
  let oDiv = document.getElementById('box'); 
  console.log(oDiv);		  // <div id="box"> </div>
  console.log(typeof oDiv); // object
  ```

  

* 通过 class 名称获取元素： `getElementsByClassName()`

  * class 名称可以重复出现在不同 DOM 元素中，获取时会返回一个伪数组、包含所有包含该类名的元素；

  ```js
  let oDivs = document.getElementsByClassName('divbox');
  
  console.log(oDivs); 		
  /* 
  HTMLCollection(2) [div#box.divbox, div#box2.divbox, box: div#box.divbox, box2: div#box2.divbox]
      0: div#box.divbox
      1: div#box2.divbox
      length: 2
      box: div#box.divbox
      box2: div#box2.divbox
      __proto__: HTMLCollection 
  */
  
  console.log(typeof oDivs);  // object
  ```

  

* 通过元素中的 name 属性获取元素： `getElementsByName`

  ```js
  let oInputs = document.getElementsByName('inputBox');
  console.log(oInputs);
  /*
      NodeList(2) [input, input]
      0: input
      1: input
      length: 2
      __proto__: NodeList
  */
  ```

  

* 通过标签名称获取： `getElementsByTagName()`

  ```js
  let oDivs = document.getElementsByTagName('div');
  // HTMLCollection(2) [div#box.divbox, div#box2.divbox, box: div#box.divbox, box2: div#box2.divbox]
  ```

  

* 通过选择器获取：推荐用这两种方法，上面的用法可以少用；

  * 选择器的语法与 CSS 一样；
  * `querySelector()`：返回根据指定选择器找到的第一个元素（其后若还有符合条件的也不会返回）

  ```js
  let oDiv1 = document.querySelector('#box');
  let oDiv2 = document.querySelector('.divBox');
  let oForm = document.querySelector('div>form');
  ```

  * `querySelctorAll()`：返回所有符合指定选择器的元素；



#### 获取 DOM 元素 --- 父/子/兄弟的元素节点

* 获取指定元素的子元素/节点：

  * 子元素：`ele.children` 获取到的是子元素（HTML 标签）；

  * 子节点：`ele.childNodes` 则会获取到所有节点（包括 标签、文本、属性等）

    ```js
    let oDiv = document.querySelector('div');
    console.log(oDiv.children);
    console.log(oDiv.childNodes);
    ```

  * 通过 `ele.childNodes` 获取到子元素的方法：

    ```js
    let oDiv = document.querySelector('div');
    for (let node of oDiv.childNodes) {
        // if(node.nodeType === 1) {
        if(node.nodeType === Node.ELEMENT_NODE) { // Node.ELEMENT_NODE 为 JS 内置常量
            console.log(node);
        }
    }
    ```

  * 获取第一个子元素/节点：

    * 子节点：`ele.firstChild`
    * 子元素：`ele.firstElementChild`

  * 获取最后一个子元素/节点：

    * 子节点：`ele.lastChild`

    * 子元素：`ele.lastElementChild`

      

* 获取父元素/节点：

  * 父元素：`ele.parentElement`

  * 父节点：`ele.parentNode`，

  * 通常两个方法的结果一样，无论是子节点还是子元素，其父元素是同一个；

  * 有两种写法的原因：以前 Firefox 不支持 `ele.parentElement`、只支持 `ele.parentNode`

  * 兼容写法：`let parentEl = childEl.parentElement || childEl.parentNode;`

    

* 获取相邻的兄弟元素/节点：

  * 上一个节点： `el.previousSibling`
  * 上一个元素： `el.previousElementSibling`
  * 下一个节点： `el.nextSibling`
  * 下一个元素： `el.nextElementSibling`

  

  

#### 元素节点的增删改查

* 创建元素节点：`let oTag = document.createElement(tag)`

* 添加节点：`oDiv.appendChild(oTag)`，

  * 把 oTag 添加为 oDiv 的最后一个子节点；

* 插入节点：`oDiv.insertBefore(newTag, oTag)`

  * 把 newTag 作为 oDiv 的子节点、插在 oTag 前面；

* 删除节点：`oTag.parentNode.removeChild(oTag)`

  * 通过调用父元素的 removeChild() 方法来删除指定元素，元素无法自己删除自己；

* 克隆节点：`let newDiv = oDiv.cloneNode()`

  * 默认浅拷贝，只克隆 oDiv 元素、不包含子元素；用 `cloneNode(true)` 即可克隆子元素；

  ```js
  let div = document.querySelector('div');
  let span = document.createElement('span');
  let aTag = document.createElement('a');
  
  div.appendChild(span); // append span tag to div tag as a child node/element
  div.insertBefore(aTag, span); // insert aTag as a child, before span tag;
  span.parentNode.removeChild(span); // remove a tag by calling its parent's method
  
  let newDiv = div.cloneNode(); // children nodes of div tag are not cloned
  let newDiv2 = div.cloneNode(true); // children included
  ```

  



#### 元素属性的增删改查

* 可通过元素对象来获取到元素属性，进而操作其属性；

* 获取元素属性：

  * 元素自带的属性可以用 el.attr（点操作符）的方式获取，也可以用 getAttribute()；
  * 自定义的元素属性必须用 getAttribute()；

  ```js
  let oImg = document.querySelector('img');  
  console.dir(oImg); // 以目录树的形式显示对象的结构和内容
  
  console.log(oImg.alt);  // I am alt
  console.log(oImg.getAttribute('alt')); // I am alt
  console.log(oImg.lwm); // undefined
  console.log(oImg.getAttribute('lwm')); // I am lwm
  ```

* 修改元素属性：

  * 元素自带的属性可以用 el.attr（点操作符）的方式进修改，也可以用 setAttribute()；
  * 自定义的元素属性必须用 setAttribute()；

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
  <meta charset="UTF-8"/>
  </head>
  <body>
  
  <img src="1.png" alt="I am alt" title="I am title" nj="I am nj">
  
  <script>
  let oImg = document.querySelector('img');  
  
  oImg.title = 'a new title';
  console.log(oImg.title);  // a new title
  oImg.setAttribute('title', 'an even newer title')
  console.log(oImg.title); // an even newer title
  
  console.log(oImg.getAttribute('nj')); // I am nj
  oImg.nj = 'a new nj';
  console.log(oImg.nj); // a new nj
  oImg.setAttribute('nj', 'a totoally new nj'); 
  console.log(oImg); // a totally new nj 
  
  </script>
  </body>
  </html>
  ```

* 新增元素属性：setAttribute('newAttr', 'attrValue')，存在就修改、不存在就新增；

  * 元素自带的属性可以用 el.attr（点操作符）的方式进新增或修改，也可以用 setAttribute()；
  * 自定义的元素属性必须用 setAttribute()；

* 删除元素属性：

  * 点操作符无法操作自定义属性，也只能重置元素自带的属性为空值，无法删除属性；
  * 删除元素属性（无论自带或自定义）必须用 removeAttribute()；
  
  ```js
oImg.alt = ""; // 通过修改为空值，清除属性值
  oImg.removeAttribute('alt'); // 删除属性名称和它的值
  ```
  
  

