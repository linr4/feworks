# JavaScript 数组的高级 API 

### 数组遍历

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
   	2. 每次执行 `fn()` 时，将当次的元素、索引和数组对象，作为 3 个形参传递给 `fn()` 函数；
   	3. 如此，在 `fn()` 函数内部即可获取当次循环的元素值、索引值和调用该方法的数组对象；

  ```js
  Array.prototype.myForEach = function (fn) {
    for (let index = 0; index < this.length; index ++) {
    	fn(this[index], index, this);
    }
  }
  
  let arr = ['AA', 'BB', 'CC', 'DD'];
  arr.myForEach(function (currentValue, currentIndex, currentArray) {
    console.log(currentValue, currentIndex, currentArray);
  });
  ```

  

  