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
            // 1.5 传入的是函数
            else if (njQuery.isFunction(selector)) {
                njQuery.ready(selector);
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
        },

        // 其它属性和方法
        jquery: '1.1.0',
        selector: '',
        length: 0,
        // [].push 意为调用数组的push方法，冒号前的push将由jQuery对象调用，结果相当于 [].push.apply(this);
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {  // 将NodeList伪数组转为真数组
            return [].slice.call(this);
        },
        get: function (num) {
            if (0 === arguments.length) {   // 没有传参给 get()
                return this.toArray();      // 就返回NodeList转的真数组
            } else if (num >= 0) {          // 参数为正数或零
                return this[num];           // 返回索引值为该参数的DOM
            } else {                        // 参数为负值
                return this[this.length + num] // 返回索引值为倒数第n个的DOM
            }
        },
        eq: function (num) {                // 与get的区别是eq返回的是jQuery对象；
            if (0 === arguments.length) {
                return new njQuery;         // 没有传参，返回空的jQuery对象；
            } else {                        // 有传参时，处理逻辑与get一样；
                return njQuery(this.get(num));
            }
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return njQuery.each(this, fn); // this 为调用者（jQuery对象，即伪数组），在工具方法each中按伪数组处理
        },
        map: function (fn) {
            return njQuery.map(this, fn);
        }
    };



    // 优化代码，把类方法（静态方法）和原型方法（实例方法）封装到 extend 方法中，以利于维护和扩展
    njQuery.prototype.extend = njQuery.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
            // 相当于 njQuery['isString'] = function () {}
            // 即：   njQuery.isString = function () {}
        }
    };

    njQuery.extend({
        trim: function (str) { // 去除字符串前后空格的静态方法
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
        },
        isString: function (param) { // 判断是否为字符串的静态方法
            return 'string' === typeof param;
        },

        isHTML: function (param) { // 判断是否为HTML字符串的静态方法
            return '<' === param.charAt(0) && '>' === param.charAt(param.length - 1) && 3 <= param.length;
            // 如果字符串以 ‘<’ 起始、以 ‘>’ 结尾，且长度大于等于3（如 <a> 标签），即为 HTML 代码
        },
        isObject: function (param) {
            return 'object' === typeof param;
        },
        isWindow: function (param) {
            return window === param;
        },
        isArray: function (param) {
            return !njQuery.isWindow(param) &&
                njQuery.isObject(param) &&
                'length' in param;
            // 是 object 类型、有 length 属性，即为（真或伪）数组；
            // window 对象是 object 类型，也有 length 属性（=0）要排除掉
        },
        isFunction: function (param) {
            return 'function' === typeof param;
        },

        ready: function (fn) { // 监听 DOM 是否加载完毕、是否可以开始执行回调
            if ('complete' === document.readyState) { // 如果文档已经加载完毕就执行回调
                fn();
            } else if (document.addEventListener) { // 如果浏览器支持 addEventListener
                document.addEventListener('DOMContentLoaded', function () { //监听一下DOM是否加载完毕
                    fn();
                })
            } else {
                document.attachEvent('onreadystatechange', function () { // 老浏览器用这种方法监听
                    if ('complete' === document.readyState) {
                        fn();
                    }
                })
            }
        },

        each: function (obj, fn) {
            // 判断是否为数组
            if (njQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    // var res = fn(i, obj[i]);
                    var res = fn.call(obj[i], i, obj[i]); // 把 this 指向 value，方便调用
                    // 调用者可以用 return true/false 来实现 continue/break
                    // 回调中若没有 return（即为 undefined）就按默认流程继续执行
                    if (true === res) {
                        continue;
                    } else if (false === res) {
                        break;
                    }
                }
            } else
                // 判断是否为对象
                if (njQuery.isObject(obj)) {
                    for (var key in obj) {
                        // var res = fn(key, obj[key]);
                        var res = fn.call(obj[key], key, obj[key]);
                        if (true === res) {
                            continue;
                        } else if (false === res) {
                            break;
                        }
                    }
                }
            return obj;
        },

        map: function (obj, fn) {
            var res = [];   // map 与 each 的区别：要返回包含了计算结果的数组，默认为空数组
            // 判断是否为数组
            if (njQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var tempRes = fn(obj[i], i);
                    if (tempRes) {      // 有值（非undefined）才添加到数组
                        res.push(tempRes);
                    }
                }
            } else
                // 判断是否为对象
                if (njQuery.isObject(obj)) {
                    for (var key in obj) {
                        var tempRes = fn(obj[key], key);
                        if (tempRes) {      // 有值（非undefined）才添加到数组
                            res.push(tempRes);
                        };
                    }
                }
            return res;
        }
    });

    // 动态添加其他方法
    njQuery.prototype.extend({
        empty: function () {
            this.each(function (idx, elm) {
                elm.innerHTML = '';
            })
            return this; // 返回调用者，方便链式调用
        },
        remove: function (selector) {
            if (0 === arguments.length) { // 如果没有传参，删除所有
                this.each(function (idx, elm) {
                    elm.parentNode.removeChild(elm);
                })
            } else {
                var $this = this;
                // 将选择器所对应的标签的类型与调用者的标签类型做比对
                // 命中的均删除
                $(selector).each(function (idx, elm) {
                    $this.each(function (i, e) {
                        if (elm.tagName === e.tagName) {
                            elm.parentNode.removeChild(elm);
                        }
                    })
                })
            }
            return this;
        },
        html: function (content) {
            if (0 === arguments.length) {
                return this[0];
            } else {
                this.each(function (idx, elm) {
                    elm.innerHTML = content;
                })
            }
        },
        text: function (content) {
            if (0 === arguments.length) {
                var res = '';
                this.each(function (idx, elm) {
                    res += elm.innerText;
                });
                return res;
            } else {
                this.each(function (idx, elm) {
                    elm.innerText = content;
                })
            }
        },
        appendTo: function (selector) {
            var $target = $(selector);
            var $source = this;
            var res = [];
            $target.each(function (index, tgtEl) {
                $source.each(function (idx, srcEl) {
                    if (index === 0) {
                        tgtEl.appendChild(srcEl);
                    } else {
                        tgtEl.appendChild(srcEl.cloneNode(true));
                    };
                    res.push(srcEl);
                });
            });
            return $(res);
        },
        prependTo: function (selector) {
            var $target = $(selector);
            var $source = this;
            var res = [];
            $target.each(function (index, tgtEl) {
                $source.each(function (idx, srcEl) {
                    if (index === 0) {
                        tgtEl.insertBefore(srcEl, tgtEl.firstChild);
                    } else {
                        tgtEl.insertBefore(srcEl.cloneNode(true), tgtEl.firstChild);
                    };
                    res.push(srcEl);
                });
            });
            return $(res);
        },
        append: function (param) {
            if (njQuery.isString(param)) {
                this[0].innerHTML = param;
            } else {
                $(param).appendTo(this);
            }
            return this;
        },
        prepend: function (param) {
            if (njQuery.isString(param)) {
                this[0].innerHTML = param + this[0].innerHTML;
            } else {
                $(param).prependTo(this);
            }
            return this;
        },
        insertBefore: function (selector) {
            var $target = $(selector);
            var $this = this;
            var res = [];
            $target.each(function (index, tgtEl) {
                $this.each(function (idx, srcEl) {
                    if (index === 0) {
                        tgtEl.parentNode.insertBefore(srcEl, tgtEl);
                    } else {
                        tgtEl.parentNode.insertBefore(srcEl.cloneNode(true), tgtEl);
                    };
                    res.push(srcEl);
                });
            });
            return $(res);
        },
        insertAfter: function (selector) {
            var $target = $(selector);
            var $this = this;
            var res = [];
            $.each($target, function (key, value) {
                var parent = value.parentNode;
                var nextNode = $.get_nextsibling(value);
                $this.each(function (k, v) {
                    if (0 === key) {
                        parent.insertBefore(v, nextNode);
                        res.push(v);
                    } else {
                        var cloneNode = v.cloneNode(true);
                        parent.insertBefore(cloneNode, nextNode);
                        res.push(cloneNode);
                    }
                });
            });
            return $(res);
        },
        replaceAll: function (selector) {
            var $target = $(selector);
            var $this = this;
            var res = [];
            $.each($target, function (key, value) {
                var parent = value.parentNode;
                $this.each(function (k, v) {
                    if (0 === key) {
                        $(v).insertBefore(value);
                        $(value).remove();
                        res.push(v);
                    } else {
                        var cloneNode = v.cloneNode(true);
                        $(cloneNode).insertBefore(value);
                        $(value).remove();
                        res.push(cloneNode);
                    }
                });
            });
            return $(res);
        },
        clone: function (deep) {
            var res = [];
            if (deep) {
                this.each(function (key, elm) {
                    var cloneNode = elm.cloneNode(true);
                    njQuery.each(elm.eventsCache, function (name, array) {
                        njQuery.each(array, function (index, method) {
                            $(cloneNode).on(name, method);
                        });
                    });
                    res.push(cloneNode);
                });
                return $(res);
            } else { // shallow copy
                this.each(function (key, elm) {
                    var cloneNode = elm.cloneNode(true);
                    res.push(cloneNode);
                });
                return $(res);
            }
        }
    });
    // 筛选相关的方法
    njQuery.prototype.extend({
        next: function (selector) {
            var res = [];
            if (0 === arguments.length) {
                this.each(function (key, value) {
                    var tempElm = njQuery.get_nextsibling(value);
                    if (null !== tempElm) {
                        res.push(tempElm);
                    }
                });
            } else {
                this.each(function (key, value) {
                    var tempElm = njQuery.get_nextsibling(value);
                    $(selector).each(function (k, v) {
                        if (null == v || tempElm !== v) {
                            return true;
                        }
                        res.push(v);
                    });
                });
            }
            return $(res);
        },
        prev: function (selector) {
            var res = [];
            if (0 === arguments.length) {
                this.each(function (key, value) {
                    var tempElm = njQuery.get_previoussibling(value);
                    if (null === tempElm) return true;
                    res.push(tempElm);
                });
            } else {
                this.each(function (key, value) {
                    var tempElm = njQuery.get_previoussibling(value);
                    $(selector).each(function (k, v) {
                        if (null === v || tempElm !== v) return true;
                        res.push(v);
                    });
                });
            };
            return $(res);
        }
    });

    // 属性相关的操作
    njQuery.prototype.extend({
        attr: function (attr, value) {
            if (njQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0].getAttribute(attr);
                } else {
                    this.each(function (key, elm) {
                        elm.setAttribute(attr, value);
                    });
                }
            } else if (njQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, e) {
                        e.setAttribute(key, value);
                    });
                });
            }
            return this;
        },
        prop: function (attr, value) {
            if (njQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0][attr];
                } else {
                    this.each(function (key, elm) {
                        elm[attr] = value;
                    });
                }
            } else if (njQuery.isObject(attr)) {
                $.each(attr, function (key, value) {
                    $this.each(function (k, e) {
                        e[key] = value;
                    });
                });
            }
            return this;
        },
        css: function (attr, value) {
            if (njQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return njQuery.getStyle(this[0], attr);
                } else {
                    this.each(function (key, elm) {
                        elm.style[attr] = value;
                    });
                }
            } else if (njQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (key, elm) {
                        elm.style[key] = value;
                    });
                });
            }
            return this; 
        },
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this.each(function (key, elm) {
                    elm.value = content;
                });
                return this;
            }
        },
        hasClass: function (name) {
            var flag = false;
            if (arguments.length === 0) {
                return flag;
            } else {
                this.each(function (key, elm) {
                    var className = ' ' + elm.className + ' ';
                    name = ' ' + name + ' ';
                    if (className.indexOf(name) != -1) {
                        flag = true;
                        return false;
                    }
                });
                return flag;
            }
        },
        addClass: function (name) {
            if (arguments.length === 0) return this;
            var names = name.split(' ');
            this.each(function (key, elm) {
                $.each(names, function (k, value) {
                    if(!$(elm).hasClass(value)) {
                        elm.className = elm.className + ' ' + value;
                    }
                });
            });
            return this;
        },
        removeClass: function (name) {
            if (arguments.length === 0) {
                this.each(function (key, elm) {
                    elm.className = '';
                });
            } else {
                var names = name.split(' ');
                this.each(function (key, elm) {
                    if ($(elm).hasClass(k, value)) {
                        elm.className = (' ' + elm.className + ' ').replace(' ' + value + ' ', '');
                    }
                });
            };
            return this;
        },
        toggleClass: function (name) {
            if (arguments.length === 0) {
                this.removeClass();
            } else {
                var names = name.split(' ');
                this.each(function (key, elm) {
                    $.each(names, function (k, value) {
                        if($(elm).hasClass(value)) {
                            $(elm).removeClass(value);
                        } else {
                            $(elm).addClass(value);
                        }
                    });
                });
            }
            return this;
        }
    });

    // 事件操作相关的方法
    njQuery.prototype.extend({

        on: function(name, callBack) {
            this.each(function (key, elm) {
                if (!elm.eventsCache) {
                    elm.eventsCache = {};
                }
                if (!elm.eventsCache[name]) {
                    elm.eventsCache[name] = [];
                    elm.eventsCache[name].push(callBack);
                    njQuery.addEvent(elm, name, function () {
                        njQuery.each(elm.eventsCache[name], function (k, method) {
                            method.call(elm);
                        });
                    });
                } else {
                    elm.eventsCache[name].push(callBack);
                }
            });
            return this;
        },
        off: function (name, callBack) {
            if (arguments.length === 0) {
                this.each(function (key, elm) {
                    elm.eventsCache = {};
                });
            } else if (arguments.length === 1) {
                this.each(function (key, elm) {
                    elm.eventsCache[name] = [];
                });
            } else if (arguments.length === 2) {
                this.each(function (key, elm) {
                    njQuery.each(elm.eventsCache[name], function (index, method) {
                        if (method === callBack) {
                            elm.eventsCache[name].splice(index, 1);
                        }
                    });
                });
            }
            return this;
        }
    });

    njQuery.prototype.init.prototype = njQuery.prototype;   // 把 init 初始化方法的原型指向 njQuery 对象的原型，使得 init 可以顺利访问 njQuery 的方法和属性、方便做初始化
    window.njQuery = window.$ = njQuery;    // 向外部暴露 njQuery 对象、作为接口函数，以方便外部调用
})(window);