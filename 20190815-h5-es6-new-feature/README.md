# 网页数据存储方案



### Cookie

###### cookie 基本概念

* 是什么：是一种客户端会话跟踪技术，相对于 session（服务端会话跟踪技术）；
* 作用：将网页数据保存到浏览器中；

###### cookie 生命周期

- 默认生命周期是一次会话，浏览器页面关闭后即结束；
- 通过 expires= 设置过期时间，在过期之前仍会存在，过期后即删除；
- 通过修改 expires= 时间可以达到马上删除 cookie 的效果；

###### cookie 数据特点

- 默认不会保存任何数据；
- 无法一次保存多条数据，只能一条一条进行保存；
- 有数据大小和条数的限制：
  - 个数：20 ~ 50
  - 大小：~4 KB

###### cookie 作用范围

* 只能在同一浏览器、同一路径下访问

* 默认情况，在当前路径下，可以访问下级路径的cookie，但无法方法上级路径的cookie；

* 若需让上级路径也可访问，需添加 path 属性：

   `document.cookie = "name=Tom;path=/;";`

* 若要让子域名也可访问其他子域名，需添加domain属性：

  `document.cookie = "name=John;path=/;domain=168.com;";`

  

```js
var date = new Date();
date.setDate(date.getDate() - 1);
var exp = date.toGMTString();

document.cookie = "name=Ray;";
document.cookie = "age=888;path=/;expires="+ exp +"domain=127.0.0.1;";

console.log(document.cookie);
```



### sessionStorage and LocalStorage

* 作用：与 cookie 同样用于存储网页数据
* 目的：缓存数据、优化性能
* 区别：
  * 生命周期：
    * cookie：浏览器关闭就失效，可设置过期时间
    * sessionStorage：仅当前会话窗口有效，窗口关闭即失效，无法设置过期时间；
    * localStorage：永久有效，除非被清除
  * 存储容量：
    * cookie：有大小（~4KB）和个数（20~50）的限制；
    * sessionStorage：有大小（5MB左右）限制；
    * localStorage：有大小（5MB左右）限制；

