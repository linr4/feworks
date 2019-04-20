function Person() {
  this.name = 'John';
  let age = 18;
}

let p1 = new Person();


console.log(p1.name); // John // 在构造函数中，用 “this.属性” 的方式创建的为公有属性，外部可直接引用
console.log(p1.age);  // undefined  // 用 “let 属性 = 值;” 的方式创建的为私有属性，外部无法直接访问
p1.age = 20;  // 虽然与私有属性同名，但它是实例属性
console.log(p1.age); // 20