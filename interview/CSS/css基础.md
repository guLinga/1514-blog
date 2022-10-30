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
2. 不能设置垂直方向的margin和padding
3. 默认宽度是内容的宽度
4. 多个元素在一行显示

块元素
1. 可以设置宽高
2. 可以设置margin和padding
3. 多个元素自动换行显示。

### 隐藏元素的方法有哪些
1. display:none：元素不显示，并且从文档流中移除
2. visibility:hidden：元素被隐藏了，但是不会脱离文档流，所以元素仍然占空间，但是不会响应绑定的监听事件。
3. opacity:0：将元素设置成透明，来隐藏元素。元素仍占用空间，并且响应绑定的监听事件。
4. 定位：通过定位将元素移除可视范围内。
5. z-index：将z-index设置成负值，让其他元素覆盖它。必须设置定位，z-index才生效。隐藏后不会响应绑定的监听事件。
6. clip/clip-path：使用元素裁剪的方法来隐藏元素，这种方法下，元素仍占位置，但是不会响应监听事件。
7. transform:scale(0,0)：元素隐藏，但是还在页面中占位置，不会响应绑定的监听事件。

### @import和link的区别
它们都是引入外部css样式的方法，不同点有：
1. link是html标签，可以引入css，还可以定义RSS等其他业务。@import只能引入css。
2. link引入css在页面载入同时加载，而@import在页面载入后加载。
3. link是html标签，无兼容性问题。而@import是css2.1提出的，低版本的浏览器有兼容性问题。
4. link支持使用javascript控制DOM去改变样式，而@import不可以。

### transition和animation的区别

### display:none与visibility:hidden的区别
1. display隐藏元素，元素会从DOM树中消失，不占位置。但是visibility:hidden不会让元素从DOM树中消失，仍然占位置。
2. display:none是非继承属性，子孙节点会跟随父节点从DOM树中消失，通过修改子孙节点也无法显示。visibility:hidden是继承属性，子孙节点的消失是因为继承了父节点的visibility:hidden，给子孙节点设置visibility:visible可以让子孙节点显示。
3. 修改display通常会导致重绘重排，但是修改visibility只会导致重绘。
4. 使用读屏器，display:none的内容不会被读取到，但是visibility:hidden的内容会被读取到。

### 伪元素和伪类的区别和作用？
伪元素是在元素的前后插入额外的元素和样式，只不过伪元素不会出现在文档流中，所以称为伪元素。
伪类是将特定的效果添加到特定的选择器上，他是给已有的元素添加样式，不会产生新的元素。

### 对requestAnimationframe的理解

### 对盒模型的理解
盒模型有两种，标准盒模型和怪异盒模型。
它们都由四个部分组成，margin、padding、border和content(内容区)。
标准盒模型的height、width只给了content(内容区)。
怪异盒模型的height、width包括了border、padding和(内容区)。
通过修改box-sizing属性来改变元素的盒模型。
box-sizing:border-box，表示怪异盒模型。
box-sizing:content-box，表示标准盒模型。

### 为什么有时候⽤translate来改变位置⽽不是定位？

### 行内元素之间有看不见的空白间隔是什么原因引起的？如何解决？
因为浏览器会把内联元素之间的空白字符，比如换行、空格、Tab等渲染成一个空格，我们在写代码的时候为了美观通常会写完一个标签后换行，这样就使得两个行内元素之间存在空白间隔。
解决方法：
1. 将标签写在同一行，让中间没有空白字符，缺点是代码不够美观。
2. 设置float:left。
3. 给包裹行内元素的块元素设置font-size:0，但是这样行内元素设置font-size:16px。
4. 给包裹行内元素的元素设置letter-spacing:-5px，给行内元素设置letter-spacing:normal。

### CSS3中有哪些新特性
1. 圆角 border-reaius
2. 

### 

### 参考资料
[1][「2021」高频前端面试题汇总之CSS篇](https://juejin.cn/post/6905539198107942919)