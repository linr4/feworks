# BOM

* 是什么？
  * **DOM**：操作HTML元素的API
  * **BOM**：操作浏览器的API

* BOM 中常见对象：
  * window - 代表整个浏览器窗口，是 BOM 的顶级（全局）对象
  * navigator - 代表当前浏览器本身的信息，常通过其userAgent属性判断用户浏览器类型
  * location - 代表浏览器地址栏的信息，用于设置或获取当前URL信息
  * history - 代表浏览器的历史信息，用于实现页面的 后退、前进、刷新；基于隐私考虑，只能拿到当前session的历史信息
  * screen - 代表用户显示器的信息，实际开发中不常用