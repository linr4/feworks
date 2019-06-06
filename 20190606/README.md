# 获取元素宽高的其它方式

1. ###### window.getComputedStyle(elm)

   * 获取到的宽高值不包括 border 和 padding

   * 行内、内联外联 CSS 设置的宽高和 JS 设置的宽高均可获取到
   * 获取到的对象的属性为只读，无法通过它修改宽高
   * 只支持 IE9 及以上版本的浏览器

   ```js
   /* 通过 getComputedStyle() 获取 */
   var divEl = document.getElementById('box');
   var divStyle = window.getComputedStyle(divEl);
   
   console.log(divStyle.width, divStyle.height); // 100px 100px 不包括 border 和 padding
   
   divEl.style.width = '166px';
   divEl.style.height = '166px';
   
   console.log(divStyle.width, divStyle.height); // 166px 166px /行内样式同样能获取到
   
   divStyle.width = '177px';   // These styles are computed, and therefore the 'width' property is read-only.
   divStyle.height = '177px';  // 会报错，只读属性、不能修改
   
   // IE9 以下版本的 IE 不支持 getComputedStyle() 方法，需要用 elm.currentStyle 属性来获取；
   ```

   

2. ###### elm.currentStyle

   * IE9 以下版本所支持的属性，除了 IE 貌似其它浏览器不支持此属性
   * 获取到的值也不包括 border 和 padding
   * 行内、内联外联 CSS 设置的宽高和 JS 设置的宽高均可获取到
   * 获取到的对象的属性为只读，无法通过它修改宽高

   ```js
   var divEl = document.getElementById('box');
   var divStyleIE8 = divEl.currentStyle;
   console.log(divStyleIE8);   // 非 IE 浏览器会报 undefined，不支持这个属性
   console.log(divStyleIE8.width, divStyleIE8.height); // IE 正常输出， 其它浏览器报错
   
   divEl.style.width = '166px';
   divEl.style.height = '166px';
   
   console.log(divStyleIE8.width, divStyleIE8.height); // 166px 166px，可以获取行内样式
   
   divStyleIE8.width = '177px';   // NoModificationAllowedError.
   divStyleIE8.height = '177px';  // 会报错，只读属性、不能修改
   ```

   

3. ###### elm.style.width/height

   * 获取到的值同样不包括 border 和 padding
   * 只能获取行内和 JS 设置的宽高，无法获取CSS设置的值
   * 该属性可以获取也可以修改
   * 所有浏览器都支持

   ```js
   var divEl = document.getElementById('box');
   console.log(divEl.style.width, divEl.style.height); // 没有输出，elm.style 只能获取到行内设置的属性，内联、外联样式无法获取到
   
   divEl.style.width = '166px';
   divEl.style.height = '166px';
   console.log(divEl.style.width, divEl.style.height); // 166px 166px，行内样式可以获取到，不包括 border & padding
   // IE9 以下浏览器也支持，无兼容性问题
   ```

   

4. ###### elm.offsetWidth/offsetHeight

   * 获取的值包括：border + padding + content_W/H
   * 行内和CSS设置的值均可获取到
   * 只能获取，不能设置
   * 所有浏览器均支持，没有兼容性问题

   ```js
   var divEl = document.getElementById('box');
   console.log(divEl.offsetWidth, divEl.offsetHeight); // 300 300，包括了 border 和 padding，不带单位 px，且 IE9 以下版本也支持
   
   divEl.offsetWidth = 166;
   divEl.offsetHeight = 166;
   console.log(divEl.offsetWidth, divEl.offsetHeight); // 300 300，没报错、但设置无法生效，对原值没影响
   
   divEl.style.width = '166px';
   divEl.style.height = '166px';
   console.log(divEl.offsetWidth, divEl.offsetHeight); // 366 366，行内和CSS设置的样式均可获取到
   ```

   