# 选项卡 - 面向对象版本

总结：与之前面向过程的版本相比，直观上来看，只是变量前多了个 `this`，把对象抽象出来、再做实例化；



* OOP version:

```js
class Tab {
    constructor() {
        // 初始化所需变量/DOM元素
        this.tabItemEls = document.querySelectorAll('.tab-item');	// 选项卡标题
        this.tabContEls = document.querySelectorAll('.tab-content');// 选项卡内容
        this.currentIndex = 0;	// 保存当前已经选择的选项卡索引
    }
    
    // 添加动态效果
    addEvent() {	
        for (let i = 0; i < this.tabItemEls.length; i++) {
            this.tabItemEls[i].onclick = _=> {
                if (i !== this.currentIndex) { // 如果不是点击了当前已选中的选项卡标题
                    
                    // 去掉当前已选中的选项卡的CSS样式类
                    this.tabItemEls[this.currentIndex].classList.remove('selected');
                    this.tabContEls[this.currentIndex].classList.remove('selected');
                    
                    // 添加选中CSS样式类到所点击的选项卡
                    this.tabItemEls[i].classList.add('selected');
                    this.tabContEls[i].classList.add('selected');
                    
                    // 更新“已选中”选项卡的索引
                    this.currentIndex = i;
                }
            }
        }
    }
}

new Tab().addEvent();
```

* Procedure-Oriented verion:

```js
window.addEventListener('load', function () {

    let tabEls = document.querySelectorAll('.tab');
    let contEls = document.querySelectorAll('.cont');
    let curIdx = 0;

    tabEls[curIdx].classList.add('selected');
    contEls[curIdx].classList.add('selected');

    for (let i = 0; i < tabEls.length; i++) {
      tabEls[i].addEventListener('click', function () {
        if (i !== curIdx) {
          this.classList.add('selected');
          contEls[i].classList.add('selected');
          tabEls[curIdx].classList.remove('selected');
          contEls[curIdx].classList.remove('selected');
          curIdx = i;
        }
      })
    }
  })
```





* 也可以继续把各种因素继续进一步抽象化，如把事件类型抽象出来：

```js
clickEvent() {
    this._addEvent('click');
}

mouseMoveEvent() {
    this._addEvent('mousemove');
}

_addEvent(ev) { // 加下划线表示该方法为私有方法，勿在外部掉用；但技术上并没有私有化、外部仍可调用
    
    for (let i = 0; i < this.tabItemEls.length; i++) {
        this.tabItemEls[i].addEventListener(ev, () => {
    
            this.tabItemEls[this.curIdx].classList.remove('selected');
            this.tabContEls[this.curIdx].classList.remove('selected');
            
            this.tabItemEls[i].classList.add('selected');
            this.tabContEls[i].classList.add('selected');
            
            this.curIdx = i;
        })
    }
}
```

