# 事件冒泡机制的应用 - 排他选单

排他选单的两种实现方式

1. 给每个 `li` 添加监听点击的事件：

   ```js
   let liEls = document.querySelectorAll('li');
   let curLi = document.querySelector('.selected');
   
   for (let item of liEls) {
       item.onclick = change;	// 抽离回调函数，不用每个 li 都创建一个函数，节省内存
   }
   function change() {
       curLi.classList.remove('selected');
       this.classList.add('selected');
       curLi = this;
   }
   ```

   

2. 监听 `ul` 的点击事件，冒泡机制使得被点击的 `li` 会把点击事件传递给父元素`ul`，通过 `ul` 的 `event.target` 属性可以获取被点击的 `li ` 对象，再进一步对该 `li` 做处理：

   ```js
   let ulEl = document.querySelector('ul');
   let curLi = document.querySelector('.selected');
   
   ulEl.onclick = function (event) {
       curLi.classList.remove('selected');
       event.target.classList.add('selected');
       curLi = event.target;
   }
   ```



---



# 阻止事件冒泡

* 现代浏览器用 `event.stopPropagation()` 方法

* IE 9 一下版本通过设置 `event.cancelBubble` 属性为`true`

```js
var parentEl = document.querySelector('.parent'); // 用 let 定义的话，IE8 会报错
var childEl = document.querySelector('.child');

parentEl.onclick = function () {
    console.log('parent');
};

childEl.onclick = function (event) {
    event = event || window.event; // 旧版本 IE 兼容写法
    console.log('child');
    
    console.log(event.cancelBubble); // 在 IE8 中仍为 false
    
    event.cancelBubble = true;	// 无论如何先执行一次
    if (event.stopPropagation) { // 如果存在这个方法也执行一次
        event.stopPropagation()
    }

    // 课程上使用了如下兼容写法，但我实际测试中无法实现功能，因为 cancelBubble 默认为 false，导致无论什么浏览器版本、每次执行的都是 stopPropagation()，IE 8就会报错找不到这个方法
    
    // if (event.cancelBubble) {
    //     event.cancelBubble = true;
    // } else {
    // event.stopPropagation();
    // }
};
```



---



# 事件冒泡 - 两组鼠标移入移出事件的区别

1. `onmouseover` vs. `onmouseenter`

   `onmouseover` 默认**触发** 事件冒泡：鼠标移入子元素之后，父元素的移入事件也会被触发；鼠标从子元素移到父元素上时，又会触发父元素移入事件；

   `onmousenter` 默认**阻止** 事件冒泡：鼠标移入子元素之后，父元素的移入事件不会被触发；鼠标从子元素移到父元素上时，不会触发父元素移入事件；

2. `onmouseout` vs. `onmouseleave`

   `onmouseout` 默认**触发** 事件冒泡：鼠标移出子元素之后，父元素的移出事件也会被触发；鼠标从父元素移到子元素上时，又会触发父元素移出事件；

   `onmousleave` 默认**阻止** 事件冒泡：鼠标移出子元素之后，父元素的移出事件不会被触发；鼠标从子元素移到父元素上时，不会触发父元素移出事件；

```js
let parentEl = document.querySelector('.parent'),
    childEl = document.querySelector('.child');

    parentEl.onmouseover = function () {
        console.log('parent mouse over');
    };
    childEl.onmouseover = function () {
        console.log('child mouse over');
    }

	parentEl.onmouseenter = function () {
    	console.log('parent mouse enter');
	};
	childEl.onmouseenter = function () {
    	console.log('child mouse enter');
	}

	parentEl.onmouseout = function () {
        console.log('parent mouse out');
    };
    childEl.onmouseout = function () {
        console.log('child mouse out');
    }

	parentEl.onmouseleave = function () {
        console.log('parent mouse leave');
    	};
    childEl.onmouseleave = function () {
        console.log('child mouse leave');
    }
```

