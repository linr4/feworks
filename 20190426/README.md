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
  
  

#### 元素内容操作

* 获取元素内容（innerHTML / innerText / textContent）

  * innerHTML 获取内容包含标签，innerText / textContent 不包含标签；
  * innerHTML / textContent 获取内容不会去除空格，innerText 会去掉空格；

* 设置元素内容

  * 三种方式设置元素内容，都会覆盖原内容；
  * innerHTML 设置内容的文本中若包含标签，会先转换成标签；
  * innerText / textContent 会把标签当文本显示、不做转换；
  * innerText / textContent 两者功能相近，早期不同浏览器分别支持两个方法；

  ```js
    let divEl = document.querySelector('div');
    
    console.log(divEl.innerHTML); //       <p>paragraph</p> divContent
    console.log(divEl.innerText); // paragraph  divContent
    console.log(divEl.textContent); //     paragraph divContent
    
    divEl.innerHTML = '<p>innerHTML in a p-tag</p>';
    divEl.firstElementChild.innerText = 'this is innerText in a paragraph';
    divEl.firstElementChild.textContent = 'this is textContent';
  ```

* textContent / innerText 兼容性写法

  ```js
  let divEl = document.querySelector('div');
  function setText(obj, text) {
      if (obj.textContent) {
          obj.textContent = text;
      } else {
          obj.innerText = text;
      }
  }
  setText(divEl, 'the text of the div');
  ```

  

#### 元素样式的操作

* 获取和设置元素样式

  ```js
    let divEl = document.querySelector('div');
    let spanEl = document.querySelector('span');
    // 1. 设置样式
    // 1.1 通过绑定类名的方式修改样式：
    divEl.className = "box";  
    
    // 1.2a 通过直接设置某个样式属性的方式（为行内样式，优先级最高）：
    divEl.style.width = "300px";
    divEl.style.height = "300px";
    divEl.style.backgroundColor = "green"; // 属性名需从hyphen写法改为camelCase写法
    
    // 1.2b 也可以把样式属性写在一起，属性名仍用CSS标准写法 - hyphen写法：
    divEl.style = "width: 400px; height: 400px; background-color: skyblue;";
    
    // 2. 获取样式
    // 2.1 通过 element.style.attr 获取
    console.log(divEl.style.width); // 若非行内（写在标签中的）样式，无法获取到属性
    
    // 2.2 通过 window.getComputedStyle 获取
    let divStyle = window.getComputedStyle(divEl);
    console.dir(divStyle); // 可获取到伪数组 CSSStyleDeclaration 包含众多CSS属性
    console.log(divStyle.width); // 可获取到设置非行内样式中的属性
    
    // 3. classList 是 H5 新增，可通过其方法 add / remove / replace 等来操作样式类
    console.log(divEl.classList);
    /*
    DOMTokenList ["box", value: "box"]
      0: "box"
      length: 1
      value: "box"
      __proto__: DOMTokenList
          add: ƒ add()  <----
          contains: ƒ contains()  <----
          entries: ƒ entries()
          forEach: ƒ forEach()
          item: ƒ item()  <----
          keys: ƒ keys()
          length: (...)
          remove: ƒ remove()  <----
          replace: ƒ replace()  <----
          supports: ƒ supports()
          toString: ƒ toString()
          toggle: ƒ toggle()  <----
          value: (...)
          values: ƒ values()
          constructor: ƒ DOMTokenList()
          Symbol(Symbol.iterator): ƒ values()
          Symbol(Symbol.toStringTag): "DOMTokenList"
          get length: ƒ length()
          get value: ƒ value()
          set value: ƒ value()
          __proto__: Object
    */
    
    spanEl.classList.add('box1');
  
  ```



#### 点击事件

* 事件：用户与浏览器的交互行为，如鼠标点击、移动等；

* 绑定事件：所有 HTML 标签均可绑定事件， element.eventName = function() {}

  ```js
  let btnEl = document.querySelector('button');
  let anchorEl = document.querySelector('a');
  
  btnEl.onclick = function () {
    alert('button clicked');
  }
  
  anchorEl.onclick = function () {
    alert('link clicked');
    return false; // 覆盖默认事件的行为
    // 如果没有 return false，在alert之后仍会转向<a>标签中的链接
  }
  ```

  