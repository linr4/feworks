# Off Canvas Sidebar Menu



### 知识点

* 在 HTML 中，在其它内容之外包裹一个 `<div class="container">` 标签，通常是为了使内容居中和实现响应式页面；样式设置为：`.container {max-width: 960px; margin: 0 auto;}`

* 图片的自适应样式设置： `img {width: 100%; height: auto;}`，可以考虑加上适当的 `padding`

* 该案例的菜单、内容的切换，都是通过 `element.classList.toggle("clsName")` 实现的，预先定义好样式 clsName；

* 内容区域的右移，是通过添加改动 margin-left 的 CSS 类 `.shift {margin: 260px;}` 实现的；

* 侧边栏菜单的隐藏，是通过绝对定位、设置 left 为其宽度的负值实现的；展示则是通过添加 CSS 类、重置 left 为 0；

* 菜单按钮通过设置三个 `<span>`  的 `display: block;` 以及添加其它样式来实现，点击后变为 X 是通过分别设置上下 `<span>` 偏转一定角度、并设置中间 `<span>` 为透明实现的；

* 关于菜单按钮的从三横到叉叉的切换，有个比较有意思的技巧：

  ```css
      .change.bar1 {
        top: 11px;
        transform: rotate(45deg);
      }
      .change.bar2 {
        opacity: 0;
      }
      .change.bar3 {
        bottom: 13px; 
        transform: rotate(-45deg);
      }
  ```

  其中 .bar1, .bar2, .bar3 三个类用于区分不同的目标 span，而 .change 用于关联同一个事件（点击）；如此，只需一个点击事件即可触发三个 span 不同的样式变化；

* 有个 CSS 属性之前比较陌生：`text-transform: uppercase;`，不过多用于西文，中文无用；

* 菜单按钮在结构上是包含在侧边栏里面，但通过绝对定位、并设置 right 为负值，把它移到侧边栏之外。