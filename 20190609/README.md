# 获取页面可视区域的宽高

###### IE9 及以上、以及其它现代浏览器：

```js
console.log(window.innerWidth, window.innerHeight);
```

###### IE8 及以下：

​	标准模式：

```js
console.log(document.compatMode); // CSS1Compat 标准模式

console.log(document.documentElement); // HTML 文档对象，既是整个网页的父元素
console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
```

​	混杂/怪异模式（混杂模式）：缺少 `<!DOCTYPE html>` 声明的页面

```js
console.log(document.compatMode); // BackCompat 混杂/怪异模式

// 混杂模式下可用 body.clientWidth 获取页面宽度，但在标准模式中无效
console.log(document.body.clientWidth, document.body.clientHeight);
```



###### 兼容写法

```js
function getPageWH() {
    var w, h;
    if (window.innerWidth) {
        w = window.innerWidth;
        h = window.innerHeight;
    } else if (document.compatMode === "CSS1Compat") {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    } else {    // BackCompact
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }
    return {width: w, height: h}
}

var pageWidth = getPageWH().width;
var pageHeight = getPageWH().height;
console.log(pageWidth, pageHeight);
```

