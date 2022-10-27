## CSS常见面试题

### CSS优先级

### CSS中继承与不可继承属性

### display属性及其作用
|属性值|作用|
|:----:|:----:|
|none|元素不显示，并且从文档流中移除|
|block|元素变成块类型，默认宽度是父元素的宽度，可以设置宽高，块元素之间换行显示。|
|inline|元素变成行内元素，默认宽度是内容的宽度，不可以设置宽高，行内元素之间不换行显示。|
|inline-block|行内块元素，默认宽度为内容宽度，可以设置宽高，但是同行显示。|
|list-item|元素变成块元素，并且添加列表标记。|
|table|让元素变成块级表格。可以给父元素使用，然后子元素设置display:table-cell和vertical-align: middle让文字垂直居中。|
|inherit|规定从父元素继承display。如果父元素没有display，那么如果父元素是块元素就继承block，如果父元素是行内元素就继承inline。|

### display的block、inline和inline-block的区别
block会让元素变成块元素，默认宽度是父元素的宽度，可以设置width、height、margin和padding，多个元素会另起一行显示。
inline会让元素变成行内元素，默认宽度是内容的宽度，不能设置width、height、垂直方向的margin和垂直方向的padding，多个元素会在一行显示。
inline-block会让元素变成inline，但是元素的内容作为block，默认宽度是内容的宽度，可以设置width、height、margin和padding，多个元素会在一行显示。

### 行内元素和块元素
行内元素
1. 不能设置宽高
2. 不能设置垂直方向的padding和margin
3. 默认宽度是内容的宽度
4. 多个元素在一行显示

块元素
1. 可以设置宽高


### 参考资料
[1][「2021」高频前端面试题汇总之CSS篇](https://juejin.cn/post/6905539198107942919)