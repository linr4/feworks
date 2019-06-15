# 事件对象中的位置属性

### offsetX  /  offsetY

鼠标事件触发时，鼠标指针相对于当前元素的位置

> **MDN:**
>
> The **offsetX** read-only property of the [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) interface provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node. 
>
> [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 接口的只读属性 **offsetX** 规定了事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量。

### clientX  /  clientY

事件触发时，鼠标指针相对于浏览器窗口可视区域（不包括滚动出可视区域的部分）的位置

### pageX  /   pageY

事件触发时，鼠标指针相对于整个网页（包括了滚动出可视区域的部分）的位置；IE9以下的浏览器不支持

### screenX  /  screenY

事件触发时，鼠标指针相对于显示器的位置，实际开发中一般用不上。