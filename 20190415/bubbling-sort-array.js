let arr = [1, 3, 5, -5];

for (let i = 0; i < arr.length; i++) {
  for (let j = i; j < arr.length; j++) {
    if (arr[i] > arr[j + 1]) {
      let tmp = arr[i];
      arr[i] = arr[j + 1];
      arr[j + 1] = tmp;
    }
  }
}
console.log(arr);