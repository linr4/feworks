### 字符串常用方法

字符串可以视为一种特殊数组，大部分数组的属性方法，字符串也可以使用。

1. 获取长度

   ```js
   let str = 'abcd';
   str.length; // 4
   ```

2. 获取字符串中某个字符

   ```js
   let str = 'abcd';
   let chr1 = str[1];	// b	进现代浏览器支持，可能存在兼容性问题
   let chr2 = str.charAt(1); // b	所有浏览器都支持
   ```

3. 字符串查找

   ```js
   let str = 'abcdefgfedcba';
   let idx1 = str.indexOf('d'); // 3	从前往后找
   let idx2 = str.lastIndexOf('d'); // 9	从后往前找
   let str1 = str.includes('c'); //  true
   ```

4. 字符串拼接

   ```js
   let str1 = 'www',
       str2 = '.com';
   let str = str1 + str2; // 推荐使用
   let str = str1.concat(str2);
   ```

5. 截取子字符串

   ```js
   let str = 'abcde';
   let str1 = str.slice(1, 3); // bc
   let str2 = substring(1, 3); // bc	从索引 1 开始，到索引 3，左闭右开 [1, 3) 不包括 3
   let str3 = substr(1, 3); 	// bcd	从索引 1 开始，截取 3 个字符；
   
   // 闭区间，v = [L, R]：可以取到端点值，存在 v=L 或 v=R 的可能性；
   // 开区间，v = (L, R)：无限趋近端点值，L < v < R，但不可能 V=L 或 V=R；
   // 		  			 无法取到端点值、区间始终无法闭合，因此称为开区间；
   ```

6. 字符串切割

   ```js
   let arr = [1, 3, 5];
   let str = join('-'); // 1-3-5
   
   let str1 = "1-3-5";
   let arr1 = str1.split('-'); // ['1','3','5']
   ```

7. 判断是否由指定字符串开头 (ES6)

   ```js
   let str = 'www.163.com';
   let res = str.startsWith('www'); // true
   ```

8. 判断是否以指定字符串结尾 (ES6)

   ```js
   let str = 'pic1.jpg';
   let res = str.endsWith('.jpg'); // true
   ```

9. 字符串模板 (ES6)

   ```js
   let be = 'is';
   let str = `this ${be} a string`; // this is a string
   
   // 模板字符串更简洁
   let strLst1 = "<ul>\n" +
       		  "    <li>第1个li标签</li>\n" +
       		  "    <li>第2个li标签</li>\n" +
       		  "    <li>第3个li标签</li>\n" +
       		  "</ul>";
   let strLst2 = `<ul>
                   <li>第1个li标签</li>
                   <li>第2个li标签</li>
                   <li>第3个li标签</li>
                  </ul>`
   ```

10. 字符串替换

    ```js
    let str = 'abc';
    let str1 = str.replace('b', 'p'); // apc
    ```

    



### 基本数据类型 和 基本包装类型

1. 基本数据类型：字符串 String，数值 Number，布尔 Boolean，空类型 null，未定义类型 undefined；

2. 通过字面量创建的基本数据类型的数据都是常量；

3. 常量的特点：常量不能被修改；

4. 基本数据类型特点：不能自定义属性和方法；运行时JS把基本数据类型包装成对象，因此有原型属性和方法；Number() 、String()、Boolean() 即为包装类型；

   ```js
   let str = new String('abc'); // 定义字符串时，JS 实际上是自动使用 String 构造函数创建了实例对象，因此有类似 .length, .indexOf() 等由原型继承而来的属性和方法；
   ```

5. 引用数据类型的特点：有自定义属性和方法；





### JS 自带对象

* 三种自带对象
  * 本地对象：
    * ECMAScript 标准中定义的类（构造函数）
    * 如 Boolean, Number, String, Array, Function, Object, Date, RegExp 等；
    * 与宿主无关，无论运行在浏览器还是在服务器端均有此类对象；
    * 需要通过 new 创建才能使用；
  * 内置对象：
    * ECMAScript 已经预先创建好的对象；
    * 如 Global, Math, JSON ；
    * 与宿主无关，无论运行在浏览器还是在服务器端均有此类对象；
    * 无需通过 new 创建即可使用；
  * 宿主对象：
    * 宿主：即 JavaScript 运行环境，如客户端的浏览器，或服务器端的 Node.js；
    * 对于在浏览器中运行的 JS 来说，宿主就是浏览器，宿主对象就是浏览器提供的对象；
    * 如： Window 和 Document 等对象；只能在其宿主 —— 浏览器环境中使用；
    * 所有 DOM 和 BOM 对象都是宿主对象；

​	

### Math 内置对象：

###### [得到一个两数之间的随机整数，包括两个数在内](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个两数之间的随机整数，包括两个数在内)

```js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
```