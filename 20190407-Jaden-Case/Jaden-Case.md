### Jaden Case



#### 题意：将句子中的每个单词首字母转为大写、其余字母小写

> Jaden Smith is the son of Will smith, the American movie star.
> Jaden usually capitalizes every words when he tweets.
>
> e.g.: "How Can Mirrors Be Real If Our Eyes Aren't Real"



#### 解题思路：

- 将字符串（句子）用`split()`方法转换为数组，每个单词为数组的一个元素，以便于单独对单词做处理；

- 用下标引用`str[0]`取得单词首字母，用`toUpperCase()`转为大写；

- 用切片方法`slice()`取得剩下的字母，用`toLowerCase()`转为小写；

- 将转换好的首字母和其余字母拼接还原为单词；

- 将处理好的单词数组用`join()`方法还原为字符串返回；

  

#### 代码与注释：

```js

// convert the 1st letter of a word to upper case, and  the rest lower case
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase(); 
}

// to capitalize the first letter of each word in a given string
function toJadenCase(str) {   
    // convert the string to an array, 
    // so that we'll be able to capitalize the words one by one
    let words = str.split(' ');   
    
    let result = [];
    for (word of words) {   // go through each word
        result.push(capitalize(word));  
        // capitalize the 1st letter of each word and push it to a temp array
    }
    return result.join(" ");  // convert the temp array to a string and return it
}

console.log(toJadenCase("How can mirrors be real if our eyes aren't real"))
```



#### 知识点：

* 转换整个单词大小写的方法： `word.toUpperCase()` 、`word.toLowerCase()`

* 截取字符串一部分的方法（切片）：`str.slice(beginIndex[, endIndex])`，类似其它语言的 `subStr()`

  * 切片取值区间为 “左闭右开” --> [beginIdx, endIdx)，即：取值包含起点值、不包含终点值；

  * 终点索引值若省略，则默认为 `string.length`

  * MDN 关于`slice()`左闭右开的说明：

    > The zero-based index *before* which to end extraction. The character at this index will not be included. If `endIndex` is omitted, `slice()` extracts to the end of the string.
    >
    > `slice()` extracts up to but not including `endIndex`.

  * 索引值为负数或超过字符串长度的说明；总的来说索引为负时，取值： `str.length + (-index)`

    > ***beginIndex*** If negative, it is treated as `strLength + (beginIndex)` where `strLength` is the length of the string (for example, if `beginIndex` is `-3` it is treated as `strLength - 3`). If `beginIndex` is greater than or equal to the length of the string, `slice()` returns an empty string.
    >
    > ***endIndex*** If negative, it is treated as `strLength + endIndex` where `strLength` is the length of the string (for example, if `endIndex` is `-3` it is treated as `strLength - 3`).

* 字符串与数组之间的转换方法： `str.split()` vs. `arr.join()`

  * 字符串转数组：`arr = str.split("seperator")`，分隔符通常为空格`space`
  * 数组转字符串：`str = arr.join("seperator")`，分隔符通常为空格`space`

