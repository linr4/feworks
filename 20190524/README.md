# 匀速动画

**Linear Animation**

### 知识点：

* 盒子的移动方向：
  * 可以通过设置步长为正值或负值来实现；
  * 步长的正负值，是通过判断当前位置和目标位置差值的正负来确定，当前位置小于目标位置，则表示要往前（往右）移动，步长应为正值；反之，当前位置大于目标位置，则要向左（向后）移动，步长为负值；
* 是否到达终点的判断：
  * 向右移动时，可以判断当前位置是否大于或等于目标位置；
  * 向左移动时，可以判断当前位置是否小于或等于目标位置；
  * 但是这样的话代码不够简洁，因此可以通过判断目标位置和当前位置差值的绝对值是否大于步长，来确定是否已到达终点；如此，两个方向的移动可以共用同一个判断的代码；
  * 原理是：当前位置的值会按照步长递增、直至达到或超过目标位置的值，即：在趋近目标值的某一次递增之后，如果（目标 - 当前）= 0，或（目标 - 当前）<（一个步长）的时候，就表示这一次递增应为最后一次递增、因为已经到达终点；使用绝对值来计算，使得计算结果不受移动方向和步长正负值的影响。

```js
    btnEl1.onclick = function () {  // move forwards to 500px
        clearInterval(timerId);
        moveBox(boxEl, 500);
    };

    btnEl2.onclick = function () {  // move backwards to 200px
        clearInterval(timerId);
        moveBox(boxEl, 200);
    };

    btnEl3.onclick = function () {  // stop moving
        clearInterval(timerId);
    };

    /**
     * moving the box as per given element object and target position
     * @param el: Object
     * @param tgtPos: Number
     */
    function moveBox(el, tgtPos) {
        let curPos = parseInt(getComputedStyle(el).marginLeft);
        let step = (tgtPos - curPos) > 0 ? 2 : -2;
        // if target position is greater than current,
        // step length should be a positive number,
        // else negative, which means it should be moving backwards.

        timerId = setInterval(function () {
            // whatever which direction it moves,
            // target minus current should be greater than step length,
            // otherwise it means the moving has met the end.
            if (Math.abs(tgtPos - curPos) > Math.abs(step)) {
                curPos += step; // increase current position by given step length
            } else {
                curPos = tgtPos;    // moving meets the end
                clearInterval(timerId);
            }
            el.style.marginLeft = curPos + 'px';
        }, 10);
    }
```

