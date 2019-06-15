# JavaScript 事件对象



* 当注册的事件被触发时，系统自动创建的对象，通过回调函数传递；

```js
btnEl.onclick = function (event) { // event 既是事件对象
  
  console.log(event); // MouseEvent {isTrusted: true, screenX: 2003, screenY: 135, clientX: 46, clientY: 19, …}
    
  console.log(typeof event); // object
}
```

* IE9 以下的事件对象不支持回调函数形参的形式，而是作为全局对象 window 的属性，需要用兼容写法：

```js
btnEl.onclick = function (event) {
  event = event || window.event;
}    
```

* 阻止默认事件；

```js
let aEl = document.querySelector('a');
aEl.onclick = function (evt) {
    alert('anchor tag is clicked');
    return false; // 阻止 <a> 标签的默认行为（跳转到 href 所指 URL）
    
    evt.preventDefault(); // 同样可以阻止默认行为，但仅IE9及以上才支持
    evt.returnValue = false; // IE9 以下支持，兼容起见，preventDefault和returnValue两句都写上
}
```

实际开发中建议使用`return false`，简洁且无需考虑兼容地实现另外两句的目的

