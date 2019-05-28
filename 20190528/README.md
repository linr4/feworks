# JavaScript 添加事件的三种方式



```js
    let btnEl = document.querySelector('#btn');

    // 方式一：给事件属性 on{event_name} 添加方法（函数）
    // 注意点：后赋值的会覆盖先赋值的，如下只有 second event 会执行

    btnEl.onclick = function () {
        console.log('btn clicked - first event');
    };
    btnEl.onclick = function () {
        console.log('btn clicked - second event');
    };

    // 方式二：addEventListener("event_name", function(){})
    // 注意点：可以多次给同一个对象添加同一个事件，不会相互覆盖、都会执行；
    // IE9及以上的版本才支持这个方法

    btnEl.addEventListener('click', function () {
        console.log('clicked - first time');
    });
    btnEl.addEventListener('click', function () {
        console.log('clicked - second time');
    });

    // 方式三：attachEvent('onEvent', function(){})
    // 注意点：只有IE8及以下的浏览器支持；
    // 也支持多次添加同一个事件，但执行顺序相反（从下往上）

    btn.attachEvent('onclick', function(){
        console.log('clicked - 111');
    });
    btn.attachEvent('onclick', function(){
        console.log('clicked - 222');
    });

    // 方式二和方式三的兼容写法：

    function addEvent(elm, evt, fn) {
        if (elm.attachEvent) {
            elm.attachEvent('on' + evt, fn);
        } else {
            elm.addEventListener(evt, fn);
        }
    }
```

