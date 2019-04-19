function Person() {
  this.name = 'John';
  let age = 18;
}

let p1 = new Person();
p1.age = 20;

console.log(p1.name); // John
console.log(p1.age);  // undefined
