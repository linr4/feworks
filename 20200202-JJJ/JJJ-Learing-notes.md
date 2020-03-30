

## Module 1 - Getting Started | Game Plan | Greetings



### Why JavaScript?

- The only one language to create full-stack, cross-platform applications



### Top 3 Mistakes to Avoid to Become Successful

- Learning too many languages at once --- This one is Dream Killer. Focus all your energy on JS.
- Copy code without understanding the code that well.
- Avoid the hard parts. Embrace what you don't know. You will have a higher chance of success.



### Average Students vs Top Students

* Everybody keeps focusing on the tip of the mountain, but forget the climb. That's why we have average is everywhere --- average pay, house, relationships, results, everything.
* The enemy of the Best is not the Worst, it's being Average.
* Life-threatening disease --- get used to being average (like diseases not hurting very much but killing you gradually)
* Average Students: listen and follow, being asked 10, but done 8. hard to lead.
* Exceptional Students: being asked 10, think 20 (and do more). leading himself, business, and everything.



### Two Rules - Motivation and Patience

* Don't Depend on Motivation
  * If so, you're bound to fail someday sooner or later.
  * You don't always like what you do all the time, but you have to do it anyway.
  * Successful people want to be successful, they crave for their end goal.
  * Motivation is a bad dependency.
* You have to have Patience
  * Put it in work, don't expect too much in a short term, be patient.
  * 12 months passes in a blink of an eye, sooner or later it's impossible for you to not be successful.



## Module 2 - Industry Standard Tools | Setup



### Alfred | The Ultimate Productivity App to 10x Your Output

- Alfred for Mac
  - 19 USD/Year
  - shortcut key: cmd + space (conflict with spotlight, need to change before opening Alfred)
  - features
    - Google
    - Open apps
    - Clipboard history (cmd + shift + v)
    - Open files / folders (space + keywords)
    - Find files / folders (find + keywords)
    - Toggle Wi-Fi (wifi)
    - Shutdown, restart, sleep, empty trash (shutdown, restart, ... same literally)
    - Prevent Mac from sleeping
    - Convert colors between HSL, Hex, RGB ( #fff, rgb(x,y,z), hsl(a,b,c) )
    - shorten a URL (goo.gl http://www.website.com/abc )
    - Control Philips hue lights
    - Tweet directly from Alfred
- Wox for Win
  - Free of charge



### VScode | The Best Ligthweight and Powerful Code Editor

- Ctrl + R: open recent
- Cmd + Comma: Settings
- Cmd + shift + P: search bar like Alfred



### Terminal - Hyper.JS | The Quiet and Simple Interface with Unlimited Potential

* Built by electron.js
* Linux-like command line



### Git vs Github

* Git is a version control system; while Github is a service to host git repositories.
* A repository is a fancy way to say a folder with more features.



### Others

* SIP - color picker
* Spectacle - Window layout managing tool





## Module 2 - JavaScript Fundamentals | Learning the ABCs



### Where Can You Write JavaScript?

- https://repl.it - online, easy to share

- Chrome DevTool console
- In <script> tag in a html file
- linked external JS file
- In Node.js etc.



### Primitive Data Types

- String, Number, Boolean, Object, Null, Undefined, Symbol



### Variables

* To avoid repetitions
* camel naming
* make it descriptive



### If Statements

```js
var num = 0;
if (num > 0) {
  console.log('Positive');
} else if (num < 0) {
  console.log('Naegative');
} else {
    console.log('Zero');
}
```



### Comparison and Logical Operators

- 比较运算符（>、>=、==、===、<、<= ）
- 逻辑运算符（ &&、||、! ）



### For Loops

```js
for (statement 1; statement 2; statement 3) {
    code block to be executed
}

for (start point; condition; increment/decrement) {
    code block to be executed;
}
```



### While Loops

```js
var i = 0;
var total = 0;
while (i < 100) {
  console.log("Hello " + i);
  total += i;
  i+=1;
}
console.log(total);

```



> for loop 用于确定次数的循环；
>
> while loop 常用于不确定次数的循环，实时做条件监测；



### Functions

> Variables store data;
>
> Functions store actions.

```js
function sum (a, b) {
    return a + b;
}

function signChecker (num) {
    var result = null;
    if (num > 0) {
        result = "Positive";
    } else if (num < 0) {
        result = "Negative";
    } else {
        result = "ZERO";
    }
    return result;
}

console.log(sum(1, 2));	// 3
console.log(signCheck(-1)); // Negative
```



### Scope - Global, Local, and Block

```js
// Global variable
var fullName = 'John Doe';
console.log(fullName);

// Local variable: a variable defined inside a function
function f () {
    var num = 88;
    console.log(num);  
};
f();	// 88

console.log(num);  // referneceError: num is not defined

// Block scope: defined by let or const, and quoted by curly brackets
let result = 'good';
const myName = 'John Doe';
```



> Whenever you have chance to use `const`, use `const`,
>
> whenever you can't, use `let`



### Objects

```js
const person = {
    eyes: 2,
    legs: 2,
    language: "English",
    speak: function () {	// a function in an object is called a method
        return "Hi"
    }
}

// How to access an object?
// dot notation:
person.eyes;
person.legs;
person.speak();	// Hi

// OR, bracket notation:
person["eyes"];
person["legs"];
person["language"];


```



### Arrays

```js
let fruits = ["mango", "cherry", "apple", true, false, 33, 3.14, [1,2,3], {a: "apple", b: "ball"}];
console.log(fruits[0]);	// mango
```

* Differences between Arrays and Objects:
  * An array is accessed by index, an object by its key / property;
  * Order matters in an array, but not in an object;





## Module 3 - Algorithmic Challenges



### Intro to Algorithmic Challenges Module

- People always stuck here and skip over and take a shortcut
- You will understand tutorials and projects better if go over basic algorithm problem solving skillset, click a lot faster and register
- Prepare you go into any situation and understand it better, faster
- gonna be tough, lonely, mentally draining, isolation, but you have to go through that, just give you boost, try to solve different problems on code challenge website.
- painful moments gonna click, register; lonely journey you have to go through



### Built-in Methods and Properties

- http://htmlcheatsheet.com/js/



### Count Vowels

> Return the number (count) of vowels in the given string.
>
> We will consider a, e, i, o, u as vowels for this Kata.
>
> The input string will only consist of lower case letters and/or spaces.



```js
let randomString = "The People's Republic of China";
    console.log(countVowels(randomString));
    console.log(cv(randomString));
    console.log(cv2(randomString));
    console.log(cv3(randomString));

    function countVowels(str) {
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        let arr = str.split('');
        let res = '';

        arr.forEach(element => {
            if (vowels.indexOf(element) > -1) {
                res += element;
            }    
        });

        return res;
    }

    function cv(str) {
        const vowels = 'aeiou';
        let res = '';
        
        for (let i = 0; i < str.length; i++) {
            if (vowels.includes(str[i])) {
                res += str[i];
            }
        }
        return res;
    }

    function cv2(str) {
        const v = 'aeiou';
        let res = '';
        for (let e of str) {
            if (v.includes(e)) {
                res += e;
            }
        }
        return res;
    }

    function cv3(str) {
        return str.replace(/[^aeiou]/gi, '');
        // 非元音字母替换为空字符；
    }
    
```



## Module 4 - Real World Components



### Build an Off Canvas Sidebar Menu

