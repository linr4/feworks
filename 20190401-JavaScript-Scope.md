#### 20190401

#### JavaScript Scope

- Three kinds of scope in JavaScript
  - **Global** : variables defined outside of any functions and curly brackets;
  - **Local** : variables inside of a function;
  - **Block** : 
    - variables inside of the curly brackets of  `if` statement, `for`  and `while` loop;
    - defined by `let` and/or `const` ( ES6);

```js
var myName = "John Doe";	// this guy is in global scope
function whatever() {
    var myAge = 28;	// this guy is in a function, where is a local scope
    if (true) {
        	let result = "bravo!";	// this guy is in an if(){...} block scope
        }
}
```

* `let` vs. `const`

  * **General rule of usage**: use `const` whenever you have a chance, then use `let` when you have to;

    

----



#### JavaScript Objects

- we use objects to describe/store more complicated data

```js
const Person = {
    eyes: 2,
    legs: 2,
    language: "English",
    speak: function() {	// anonymous function, it's called "method" in an object;
        return "Hello";
    }
}

Person.eyes;	// dot notation
Person.language;
Person.speak()	// has to have parentheses after the name of a method when calling it

Person["eyes"];	// bracket notation, works as dot notation

```



---



#### JavaScript Arrays

- array is an index-based object;
- **array vs. object:**  
  - we use index to access an array, but use "key" to access the value of an object;
  - order matters in an array, but doesn't in an object;

```js
let fruits = ["mango", "lemon", true, 3.14, [1,2,3], {f1: "apple", f2: "banana"}];
fruits[8];
```

