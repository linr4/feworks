// Prior to ES6
function fn1(a, b) {
  var a = a || 'default-a';
  var b = b || 'default-b';
  console.log(a, a);
}

console.log(fn1());  // ddefault-a  default-b
console.log(fn1('aa', 'bb')); // aa  bb

// Since ES6
function fn2(a = 'default-a', b = bDefault()) {   // 形参直接用字面量赋值的形式，可从其它函数传入
  console.log(a, b);
}

function bDefault () {
  return 'default-b';
}

console.log(fn2());  // ddefault-a  default-b
console.log(fn2('aa', 'bb')); // aa  bb