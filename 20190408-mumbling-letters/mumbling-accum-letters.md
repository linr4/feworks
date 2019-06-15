### Mumbling - Accumulating letters in a word



#### 要达到的效果：

* 输入“abcdefg”，输出“A-Bb-Ccc-Dddd-Eeeee-Ffffff-Ggggggg”



#### 代码：

```js
function repLetter (letter, rep) {	// 按指定次数 (rep) 重复每个字母 (letter)，首字母大写
    let res = '';
    for (let i = 0; i < rep; i++) {
        res += i === 0 ? letter.toUpperCase() : letter.toLowerCase();
        
        /* 以上三目运算等价于如下代码：
		if (i == 0) { res = res + letter.toUpperCase();}	// 如果是首字母就大写
		    else    { res = res + letter.toLowerCase();}	// 其余字母小写 */
    }
    return res;
}

function accum (word) {		// 输入“abcdefg”，输出“A-Bb-Ccc-Dddd-Eeeee-Ffffff-Ggggggg”
    let letters = word.split(''),	// 把单词字符串分解成字母数组
        result = [],	// 存放处理结果的临时数组
        counter = 1;	// 既是字母在数组中的位置的索引值，同时也是按索引值确定重复次数的计数器
    for (let letter of letters) {
        result.push(repLetter(letter, counter)); // 第一个字母大写并重复 1 次，第二个 2 次...
        counter++ ;
    }
    return result.join('-');
}

console.log(accum('abcdefgh'));


--------------------- 另外一种实现方法 -----------------------
    
    
function repeatLetter (letter, repeatTimes) {
    let res = '';
    for (let i = 0; i < repeatTimes; i++) {
        res = res + (i == 0 ? letter.toUpperCase() : letter.toLowerCase());
    }
    return res;	// 这里的 res 变量如果也写成 result 的话，会和 accum() 的 result 变量冲突而报错
}

function accum (word) {
    let letters = word.split('');
    let result = [];
    for (let i = 1; i <= letters.length; i++) {	// 把 i 同时当做重复次数的计数器，必须从 1 开始
        result.push(repeatLetter(letters[i-1], i));	// letters 索引从 0 开始
    }
    return result.join('-');	// 用 for(i) 比用 for...of 在确定索引值的逻辑上有点绕
}

console.log(accum('abcdefg'));
```



#### Random thoughts

* 今天没有用 VS Code 或 WebStrorm 的 auto complete 功能，而是用 Notepad++ 手写全部代码，以便使自己熟悉和掌握代码的每个细节，把 gitMiddle(), toJadenCase(), mumbling() 三个练习敲了有二十几遍，虽然慢一点，但感觉有收获 —— 特别是对 html 文件的结构，一天下来敲了二十遍，现在已经很熟悉了；以后也要尽量按这个方法刻意练习，我的首要目的不是快、而是学有所成；正所谓：欲速不达、慢以致远。

