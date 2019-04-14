'use strict'

// Compare the given numbers and sort them in ascending order

let a = 3, b = 2, c = 5;
let temp = 0;

console.log(a, b, c);

if (a > b) {
  temp = a;
  a = b;
  b = temp;
}

if (a > c) {
  temp = a;
  a = c;
  c = temp;
}

if (b > c) {
  temp = b;
  b = c;
  c = temp;
}

console.log(a, b, c)