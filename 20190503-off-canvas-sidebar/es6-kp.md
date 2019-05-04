# ES6 Knowledge Points



###  var, let and const

* `var` is function scoped, however, `let` / `const` is block scoped;

  ```js
  function f1() {
      var x = 'this variable is function scoped';
      if (true) {
          let y = 'this variable is block scoped';
      }
      console.log(y); // y is not defined
  }
  console.log(x); // x is not defined
  ```

  

* `const` doesn't mean a value can't be change, if it is a primitive, yes the value can't be changed; but if it is an object, its properties & methods can be changed.



* use rule:
  * use `const` wherever you can, use `let` where you have to;
  * try not to use `var` anytime anywhere;



### functions

* Ways to create a function:

```js
// function declaration
function f1() {
    console.log('function declaration');
}

// function expression
let f2 = function () {
    console.log('function expression');
}

// anonymous function
btn.onclick = function () {
    // do something
}
```

* Way of ES6 to create a function

```js
let f1 = (a, b) => {
    console.log('this is an Arrow Function, new ES6 function');
    return a + b;
}

let f2 = _ => {
    // if no parameters, use a underscore instead, is also valid
}

let f3 = x => {
    // if only one parameter, parentheses can be omitted
}

let f4 = (x, y) => return x + y;
	// if only one line of code, curly brackets can be omitted
```



### this

* Don't use Arrow Function as a method of an object, because `this` won't refer to the object if so.
* In an arrow function, `this` refers to the root of current scope, not its caller



### default function parameters

```js
// ES5 
function dispEdu(college) {
    if (!college) {college = "No college info provided."}
    // or
    college = !college ? "No college info provided." : college;
    // or
    college = college || "No college info provided.";
}
// ES6
function dispEdu(college = 'No college info provided.') {
    // do something
}
```



### Destructuring Objects

```js
const Person = {
    fullName: 'John',
    age: 27,
    hobbies: ['comedy', 'youtube', 'being lazy'],
    address: {
        street: '123 main st.',
        zipcode: 518000
    }
}
const {fullName, age} = Person;	 // John 27
const {fullName: pName, age: pAge} = Person; // John 27, variable can be renamed
```



### Destructuring Arrays

```js
let [x, y, z] = [1, 2, 3];  // x=1, y=2, z=3
let [a, b, c, ...rest] = [1, 2, 3, 4, 5, 6]; // a=1, b=2, c=3, rest=[4, 5, 6]

// common use scenario - swapping values
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1
```



### Rest vs. Spread (...) Operator

* Rest Operator: to change a serial of comma-seperated values into an array.

  ```js
  // In ES6, use Rest operator to deal with infinite parameters
  function adder(...values) {
      console.log(values); // [1, 2, 3, 4, 5, 6]
      let total = 0;
      for (let val of values) {
          total += val;
      }
      return total;
  }
  console.log(adder2(1, 2, 3, 4, 5, 6));  // 21
  
  /*** another way to do this in ES5 ***/
  function adder() {
      console.log(arguments);
      //Arguments(6) [1, 2, 3, 4, 5, 6, callee: ƒ, Symbol(Symbol.iterator): ƒ]
      
      let total = 0;
      for (let el of arguments) {
          total += el;
      }
      return total;
  }
  console.log(adder(1, 2, 3, 4, 5, 6));  // 21
  ```

* Spread Operator: it does the opposite, it converts an array to a comma-seperated value.

  ```js
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let total = [];
  
  // usually we loop nums[] array to push the values into total:
  for (let num of nums) {total.push(num)}
  
  // now we can do this with Spread Operator:
  total.push(...nums); 
  // spread operator (...) will covert nums array to a serial of comma-seperated values
  // like:  total.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
  ```

  

### Next Level Object Literals

```js
let name = 'John',
    age = '18',
    gender = 'Male';

let human = {
    name = name,	// John
    age = age,		// 18
    gender = gender,// Male
    walk = function () {
        console.log('I am walking.')
    }
}

// in ES6, these can be shorten

let human2 = {
    name,	// if obj.propName is the same as variable, then "prop=" can be omitted
    age,
    gender,
    walk() {	// statement "= function" can also be omitted
        console.log('I am walking.')
    }
}
```



### Template Strings

```js
let name = 'John Doe',
    age = 25,
    profession = 'Barista';
console.log(`My name is${name}. I am ${age}. I work as a/an ${profession}`);

// another scenario to use template strings


function createLongHTML() {
    // what we have to do without tempate strings:
    let html = '<div>';
    html += '<p> hi this is a paragraph </p>';
    html += '<h1> this is heading </h1>';
    html += '</div>';
    
    // what we will do with tempate strings:
    let html2 = `
		<div>
			<p> this is a paragraph </p>
			<h1> this is heading </h1>
		</div>
	`;
    
    document.querySelector('body').innerHTML = html;
    document.querySelector('body').innerHTML = html2;
}
```

