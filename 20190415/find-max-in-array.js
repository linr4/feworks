let arr = [3, 5, -2, 7, 4];
let maxVal = arr[0];
for (let curElm of arr) {
  if (maxVal < curElm) {
    maxVal = curElm;
  }
}
console.log('The maximum value in the array is: ' + maxVal);