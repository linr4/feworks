function getSum() {
  let sum = 0;
  for (let val of arguments) {
    sum += val;
  }
  return sum;
}

console.log(getSum(1, 100, 20, 77));

function getSum2(...values) { // rest parameter
  let sum = 0;
  for (let num of values) {
    sum += num;
  }
  return sum;
}

console.log(getSum(1, 100, 20, 77));