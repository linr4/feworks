# JavaScript 数组的高级 API 

### 数组的遍历

* 通常的遍历方法：

  ```js
  let arr = [11, 22, 33, 44, 55];
  for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
  }
  ```

  

* `for..in` 遍历方法：

  ```js
  let arr = [11, 22, 33, 44, 55];
  for (let key in arr) {
      console.log(arr[key]);	// key 为数组的索引
  }
  ```

  在开发中不推荐使用`for...in`方法，`for...in`主要用于遍历 属性和值 是无序的对象；

  > **Note:** `for...in` should not be used to iterate over an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) where the index order is important.  --- from MDN: [ Array iteration and for...in ](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in>)

  ```js
  // 对象的属性在定义时的顺序和输出时的顺序是不同的，不同于数组元素的有序，它是无序的：
  
  function Person() {
    this.name = 'R';
    this.gender = 'male';
    this.age = 25 }
  
  let p = new Person();
  console.log(p);
  
  /*
  Person {name: "R", gender: "male", age: 25}	
  age: 25
  gender: "male"
  name: "R"
  */
  ```

  

* `for...of` 遍历方法：

  ```js
  let arr = [11, 22, 33, 44, 55];
  for (let item of arr) {
    console.log(item);
  }
  ```

  

* 用数组对象自带的 `forEach()` 方法：

  ```js
  // 用法：arr.forEach(function (currentValue, currentIndex, currentArray))
  let arr = [11, 22, 33, 44, 55];
  arr.forEach(function (cv, ci, ca) {
      console.log(cv);
  })
  ```

  `forEach()` 方法的实现原理：

  	1. 在 `forEach(fn)` 方法内部，以 `for` 循环执行 n 次 `fn()` 回调函数，n 等于数组长度；
   	2. 每次执行 `fn()` 时，将当次的元素值、索引值和数组对象，作为三个形参传递给 `fn()` 回调函数；
   	3. 如此，在 `fn()` 函数内部，即可经由形参获取到当次循环的元素值、索引值和调用该方法的数组对象，并可引用这些形参做相应处理（如下例中，做 `console.log(val, idx, arr)` 输出当次三个形参的值）。

  ```js
  Array.prototype.myForEach = function (fn) {
    for (let index = 0; index < this.length; index ++) {
    	//here `this` refers to the caller of forEach(), i.e. the Array instance: arr[]
        fn(this[index], index, this);
   	//fn(currentValue, currentIndex, currentArray);
    }
  }
  
  let arr = ['AA', 'BB', 'CC', 'DD'];
  arr.myForEach(function (currentValue, currentIndex, currentArray) {
    console.log(currentValue, currentIndex, currentArray);
  });
  
  /* outputs:
  AA 0 (4) ["AA", "BB", "CC", "DD"]
  BB 1 (4) ["AA", "BB", "CC", "DD"]
  CC 2 (4) ["AA", "BB", "CC", "DD"]
  DD 3 (4) ["AA", "BB", "CC", "DD"]
  */
  ```

  

  

### 数组的查找

* `indexOf()` ：从左往右查找，找到返回索引，找不到返回 -1；

* `lastIndexOf()` ： 从右往左查找，找到返回索引，找不到返回 -1；

* `includes()`：从左往右查找，找到返回 true，找不到返回 false；

  ```js
  let arr = [11,22,33,44,55,66];
  let idx1 = arr.indexOf(33); // 2
  let idx2 = arr.lastIndexOf(44); //3
  let res = arr.includes(22); // true
  ```

* `findIndex` ：定制版的 `indexOf`，使用回调函数，找到返回索引、找不到返回 -1；

  ​	[**Syntax:**](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex>)    `arr.findIndex(callback(element[, index[, array]])[, thisArg])`

* `find` ：类似 `findIndex`  ，但 `find` 返回找到的元素，找不到就返回 undefined；

  ```js
  let arr = ['aa','bb','cc','dd','ee'];
  let idx = arr.findIndex(function(element, index, array){
      console.log(element, index, array); // 只输出到 cc
      if(currentValue === 'cc'){
      	return true; // return true; 之后就跳出回调函数
      }});
  console.log(idx);   // 2
  
  let elm = arr.find(function(element, index, array){
      console.log(element, index, array); // 只输出到 dd
      if(currentValue === 'dd'){
        return true; // return true; 之后就跳出回调函数
      }});
  console.log(elm);   // dd
  
  // MDN 的例子
  var array1 = [5, 12, 8, 130, 44];
function isLargeNumber(element) {
    return element > 13; // 不一定非得 return true; 只要条件满足即可
}
  console.log(array1.findIndex(isLargeNumber)); // expected output: 3
  
  var array2 = [5, 12, 8, 130, 44];
  var found = array2.find(function(element) {
    return element > 10;
  });
  console.log(found); // expected output: 12
  ```
  
* `findIndex()` 和 `find()` 的实现：

  与 `forEach()` 很类似，比 `forEach()` 多一层判断条件是否满足的逻辑，并返回满足条件的索引或元素；

  ```js
  Array.prototype.myFindIndex = function (fn) {
    for (let idx = 0; idx < this.length; idx ++) {
      if(fn(this[idx], idx, this)) {  // fn(elm, idx, arr);
        return idx;
      }
    }
  }
  
  Array.prototype.myFind = function (fn) {
    for (let idx = 0; idx < this.length; idx ++) {
      if(fn(this[idx], idx, this)) {
        return this[idx];
      }
    }
  }
  ```

  

   

### 数组的过滤和映射

* 过滤 `arr.filter()`，返回一个由满足条件的元素组成的新数组；

  > The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.
  >
  > ##### [Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Syntax)
  >
  > ```js
  > var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
  > ```
  >
  > ##### [Return value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Return_value)
  >
  > A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.

  

* 映射 `arr.map()`，返回新数组、长度与原数组一致，满足条件的元素保持原状，不满足的为 undefined；

  > The `map()` method creates a new array with the results of calling a provided function on every element in the calling array.
  >
  > ##### [Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Syntax)
  >
  > ```js
  > var new_array = arr.map(function callback(currentValue[, index[, array]]) {
  >  // Return element for new_array
  > }[, thisArg])
  > ```
  >
  > ##### [Return value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Return_value)
  >
  > A new array with each element being the result of the callback function.





  ```js
  let arr = [11,22,33,44,55];
  
  let newArr = arr.filter(function (elm, idx, arr) {
    // console.log(elm, idx, arr);
    return (elm % 2 === 0);
  });
  
  // 返回一个由满足条件的元素组成的新数组
  console.log(newArr);  // [22, 44]
  
  let newArr2 = arr.map(function (elm, idx, arr) {
    // console.log(elm, idx, arr);
    if (elm % 2 === 0) {
      return elm;
    };
  });
  
  // 返回新数组、长度与原数组一致，满足条件的元素保持原状，不满足的为 undefined
  console.log(newArr2);  // [undefined, 22, undefined, 44, undefined]
  ```

  

* MDN 的例子：

  ```js
  // filter:
  var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
  const result = words.filter(word => word.length > 6);
  console.log(result);
  // expected output: Array ["exuberant", "destruction", "present"]
  
  
  // map:
  var array1 = [1, 4, 9, 16];
  // pass a function to map
  const map1 = array1.map(x => x * 2);
  console.log(map1);
  // expected output: Array [2, 8, 18, 32]
  ```

  

* 自己实现 filter 和 map：

```js
Array.prototype.myFilter = function (fn) {
  let result = [];
  for (let idx = 0; idx < this.length; idx ++) {
     // fn(currentElement, currentIndex, currentArray)
    if (fn(this[idx], idx, this)) {	// 如果回调函数执行结果为真
      result.push(this[idx]);	// 把当前元素添加到新数组
    }
  }
  return result; // 完成后返回由满足条件的元素组成的新数组
}

Array.prototype.myMap = function (fn) {
  let result = new Array(this.length);	// 创建一个与数组调用者的长度一致的空数组
  for (let idx = 0; idx < this.length; idx ++) {
    result[idx] = fn(this[idx], idx, this); // 把新数组中当前索引的元素赋值为回调函数的返回结果
  }
  return result;
}
```

