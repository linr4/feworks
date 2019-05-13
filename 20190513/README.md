# 日期时间差值的计算

#### Calculation on Date/Time differential



##### 知识点：

* 两个日期实例对象之间可以直接作为操作数（Operands）参与运算；

* `date1 - date2` 相减结果为毫秒数；

* 等价于 `date1.valueOf() - date2.valueOf()` ；

  ```js
  let curDate = new Date(); // current date
  let tgtDate = new Date('2019-10-01 00:00'); // target date
  let totalDiffMs = tgtDate - curDate; // milliseconds of the differential
  ```

  

* 差值拆解为 日、时、分、秒 的计算逻辑：

  ```js
  const second = 1000;  		// milliseconds of a second
  const minute = 60 * second; // milliseconds of a minute
  const hour = 60 * minute;	// milliseconds of an hour
  const day = 24 * hour;		// milliseconds of a day
  
  let totalDiffMs = tgtDate - curDate; 
  
  // 天数差值 = 总毫秒数 / 一天的毫秒数，向下取整
  let diffDays = Math.floor(totalDiffMs / day);
  
  // 小时差值 = 总毫秒数刨去可以整除天数的部分，余数再除以1个小时的毫秒数，向下取整
  let diffHours = Math.floor(totalDiffMs % day / hour); 
  
  // 分钟差值 = 总毫秒数刨去可以整除小时数的部分，余数再除以1分钟的毫秒数，向下取整
  let diffMinutes = Math.floor(totalDiffMs % hour / minute);
  
  // 秒数差值 = 总毫秒数刨去可以整除分钟数的部分，余数再除以1秒钟的毫秒数，向下取整
  let diffSeconds = Math.floor(totalDiffMs % minute / second);
  ```

  

##### 补充知识：

* **位权**：对于多位数，处在某一位上的“1”所表示的数值的大小，称为该位的位权。例如十进制第2位的位权为10，第3位的位权为100；而二进制第2位的位权为2，第3位的位权为4，对于 N进制数，整数部分第 i位的位权为N^(i-1)，而小数部分第j位的位权为N^-j

* **进制**：进制也就是进位计数制，是人为定义的带进位的计数方法（有不带进位的计数方法，比如原始的结绳计数法，唱票时常用的“正”字计数法，以及类似的tally mark计数）。 对于任何一种进制---X进制，就表示每一位置上的数运算时都是逢X进一位。 十进制是逢十进一，十六进制是逢十六进一 ...





##### 我的理解和总结：

* 计时单位的进制：
  * 毫秒到秒时1000进制
  * 秒到分、分到时是60进制
  * 时到天是24进制

* 计时单位的位权：
  * 秒：相对于毫秒， 秒的位权 = 1000
  * 分：
    * 相对于秒钟，分钟的位权 = 60
    * 相对于毫秒，分钟的位权 = 60 * 1000 = 60000
  * 时：
    * 相对于分钟，小时的位权 = 60
    * 相对于秒钟，小时的位权 = 60 * 60 = 3600
    * 相对于毫秒，小时的位权 = 60 * 60 * 1000 = 3600000
  * 天：
    * 相对于小时，天的位权= 24
    * 相对于分钟，天的位权 = 24 * 60 = 1440
    * 相对于秒钟，天的位权 = 24 * 60 * 60 = 86400
    * 相对于毫秒，天的位权 = 24 * 60 * 60 * 1000 = 86400000



* 对于要计算剩余 x天x时x分x秒 的需求，若日期时间的差值基准数是毫秒，那么：
  * 计算天数就把差值除以天vs.毫秒的位权后取整即可；
  * 计算小时则需排除差值可以取整的天数（做取余操作：差值 % 天的位权），再把余数除以小时的位权；
  * 计算分、秒，与计算小时是同样的逻辑。