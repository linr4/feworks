### X's and O's

#### 题目：

> Check to see if a string has the same amount of X's and O's. The method must return a Boolean and be case insensitive. The string can contain any char.

> Examples input/output:

> XO("ooxx") => true；
 
> XO("xooxx") => false;
 
> XO("ooxXm") => true;
 
> XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true;

> XO("zzoo") => false

​    简言之，统计字符串中的 “X” 和 “O” 个数，相等则为 True、不等则为 False



#### 代码与注释：

```js
function XO (str) {
    let [xCount, oCount] = [0, 0];
    for (let chr of str) {	// go through the string to count 'x' and 'o' characters.
        chr = chr.toLowerCase();
        if (chr === 'x') xCount++;	// 此处只有一个语句，可以省去 { }
        if (chr === 'o') oCount++;	// 此处没有用 else，效果一样
    }

    // 以下 return false 部分刻意不放在 else 中，因 return 之后的代码不会执行，与 else 的效果一样
    if (xCount === oCount) {
        return true;	// x 与 o 的个数相等；即使 X/O 都没有、计数器均为 0 也是相等、返回 true
    }
    return false;	// the amount is not the same => false

    // 以上 if 判断和返回可以精简为一句：
    return xCount === oCount;
}

console.log(XO("ooxx"));
console.log(XO("xooxx"));
console.log(XO("ooxXm"));
console.log(XO("zpzpzpp"));
console.log(XO("zzoo"));
```

#### 知识点：

* 涉及到比较个数的逻辑，第一时间要想起用计数器；
* `if` 语句之后的 `else` 有时候并非必须；
* 比较大小之后返回逻辑结果的，可以用诸如 `return xCount === oCount` 这种形式的代码，简洁高效；



---





### Who likes it

#### 题目：

​	统计 Tweeter / 微博 点赞人数，根据人数返回不同提示语；

#### 代码与注释：

```js
function likes (names) {
    switch (names.length) {
        case 0: return `no one like this.`;
            	break;	// break 前面有 return，实则 break 可以不写
        case 1: return `${names[0]} likes this.`;
        case 2: return `${names[0]} and ${names[1]} like this.`;
        case 3: return `${names[0]}, ${names[1]} and ${names[2]} like this.`;
    }
    if (names.length > 3) {
        return `${names[0]}, ${names[1]} and ${names.length - 2} others like this.`;
    }
}

console.log(likes([]));
console.log(likes(['Joe']));
console.log(likes(['Joe','Kim']));
console.log(likes(['Joe','Kim','Willy']));
console.log(likes(['Joe','Kim','Willy','Beth']));
console.log(likes(['Joe','Kim','Willy','Beth','Tom']));

// 输出结果：
	// no one like this.
	// Joe likes this.
	// Joe and Kim like this.
	// Joe, Kim and Willy like this.
	// Joe, Kim and 2 others like this.
	// Joe, Kim and 3 others like this.
```

#### 知识点：

* 之前很少用到 `switch` 语句，有点陌生，这个案例多练练以便记住 `switch` 语句的结构；

  ```js
  switch (variable) {
      case value_X__of_variable:
          do_sth;
          continue or break;
      case value_Y__of_variable:
          do_sth;
          continue or break;
      ...
      default:
      	// if no case is hit, do this
  }
  ```

* `return` 之后的代码不会执行，因此诸如 `break` 、`else` 等跳转语句有时候可以省去，注意逻辑；

* 留意 ES6 模板字符串 ( template literals / strings ) 用法：`` ` `` `strings ${var/exp} strings` `` ` `` ，用反引号 ( back-tick / back-quote ) 包含字符串，变量或表达式放在`${ }` 里面；

* 