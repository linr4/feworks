(function (window, undefined) {
    var njQuery = function (selector) {
        return new njQuery.prototype.init(selector);
    };
    njQuery.prototype = {
        constructor: njQuery,
        init: function (selector) {

            // 0. 去除传入字符串的前后空格
            selector = njQuery.trim(selector);
            // 1. 不传参数，或传入 ''（空字符串），null，undefined，NaN， 0，false，返回空jQuery对象；
            if (!selector) {
                return this;   // 返回空jQuery对象
            }
            // 2. 传入的是字符串：
            else if (njQuery.isString(selector)) {
                // - 判断是否 HTML 代码片段
                if (njQuery.isHTML(selector)) {
                    // 创建所有元素
                    var tempEl = document.createElement('div');
                    tempEl.innerHTML = selector;

                    // 将一级元素添加到jQuery对象中

                    /*for (var i = 0; i < tempEl.children.length; i++) {
                        this[i] = tempEl.children[i];
                    }
                    // 添加length属性
                    this.length = tempEl.children.length;*/

                    // 以上 for 循环的代码可以用以下一句代码实现：
                    // 把tempEl.children这个HTMLCollection（伪数组）push到njQuery对象中

                    [].push.apply(this, tempEl.children);
                } else {
                    // 传入字符串为选择器；
                    var res = document.querySelectorAll(selector);
                    [].push.apply(this, res);
                }
            }
            // 3. 传入的是数组
            else if (njQuery.isArray(selector)) {
                /*
                // 3.1 真数组
                if ('[object Array]' === ({}).toString.apply(selector)) {
                    [].push.apply(this, selector); // 转为伪数组插入 njQuery
                    return this;
                } else  
                // 3.2 伪数组
                if ('[object Object]' === ({}).toString.apply(selector)) {
                    // 处理自定义数组时，最好先转为真数组，再根据需要转成真或伪数组
                    var tempArr = [].slice.call(selector); // 伪数组转真数组
                    [].push.apply(this, tempArr); // 真数组转伪数组，插入njQuery
                    return this;
                } 
                */
                // 优化以上代码：
                var tempArr = [].slice.call(selector); // 无论真伪数组，都先转为真数组
                [].push.apply(this, tempArr); // 把转换好的真数组内容保存到 njQuery 中
            }
            // 4. 除上述之外，把该数据保存到jQuery对象中，返回；
            else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        }
    };

    njQuery.trim = function (str) { // 去除字符串前后空格的静态方法
        if (!njQuery.isString(str)) { // 传入的不是字符串就不处理
            return str;
        }
        if (window.trim) {  // 如果浏览器支持 trim() 方法，执行之
            return str.trim();
        } else {    // 否则用正则表达式来操作：
            return str.replace(/^\s+|s+$/g, '');
            // \s 匹配一个空格，\s+ 匹配一个或多个空格
            // ^\s+ 匹配以空格起始的字符串中的一个或多个空格，
            // | 或，
            // \s+$ 匹配以空格结尾的字符串中的一个或多个空格，
            // g全局匹配；
            // 第二个参数''，替换成空字符串
        }
    };

    njQuery.isString = function (param) { // 判断是否为字符串的静态方法
        return 'string' === typeof param;
    };

    njQuery.isHTML = function (param) { // 判断是否为HTML字符串的静态方法
        return '<' === param.charAt(0) && '>' === param.charAt(param.length - 1) && 3 <= param.length;
        // 如果字符串以 ‘<’ 起始、以 ‘>’ 结尾，且长度大于等于3（如 <a> 标签），即为 HTML 代码
    };
    njQuery.isObject = function (param) {
        return 'object' === typeof param;
    };
    njQuery.isWindow = function (param) {
        return window === param;
    };
    njQuery.isArray = function (param) {
        return !njQuery.isWindow(param) &&
            njQuery.isObject(param) &&
            'length' in param;
        // 是 object 类型、有 length 属性，即为（真或伪）数组；
        // window 对象是 object 类型，也有 length 属性（=0）要排除掉
    };

    njQuery.prototype.init.prototype = njQuery.prototype;   // 把 init 初始化方法的原型指向 njQuery 对象的原型，使得 init 可以顺利访问 njQuery 的方法和属性、方便做初始化
    window.njQuery = window.$ = njQuery;    // 向外部暴露 njQuery 对象、作为接口函数，以方便外部调用
})(window);