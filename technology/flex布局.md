[<=返回](./index.md)
<hr/>

### Flex布局

&ensp;&ensp;&ensp;&ensp;Flex布局主要是针对容器和项目来说的，容器就是包裹其他元素的元素，项目就是大被包裹的元素。

#### Flex布局容器

&ensp;&ensp;&ensp;&ensp;首先我们先明白容器有主轴和与主轴垂直的轴。
&ensp;&ensp;&ensp;&ensp;我们先了解一下Flex布局容器上面的属性都有哪些

1. flex-direction：决定主轴的方向
   - row（默认值）：水平方向从左到右
   - row-reverse：水平方向从右到左
   - column：垂直方向从上到下
   - column：垂直方向从下到上

2. flex-wrap：项目排列在主轴上的换行方式
   - nowarp（默认值）：不换行
   - warp：换行，并且第一行在上方
   - warp-reverse：换行，第一行在下方

3. flex-flow：前两个属性的简写形式（flex-flow:<flex-direction> || <flex-wrap>）

4. justify-content：主轴上项目的对齐方式
   - flex-start：对其主轴的开始位置
   - flex-end：对其主轴的结束位置
   - center：居中
   - space-between：两端对其，项目间隔相等
   - space-around：项目两侧间隔相等

5. align-items 项目在主轴交叉轴上的对齐方式
   - flex-start：交叉轴的起点对齐
   - flex-end：交叉轴的终点对齐
   - center：交叉轴居中
   - baseline：项目的第一行文字的基线对齐
   - stretch（默认值）：如果高度没设置，高度为auto

6. align-content：多条主轴的对齐方式，如果只有一条主轴则不生效
   - flex-start：与交叉轴的起点对齐。
   - flex-end：与交叉轴的终点对齐。
   - center：与交叉轴的中点对齐。
   - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
   - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
   - stretch（默认值）：轴线占满整个交叉轴。

#### Flex布局项目

1. order：属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

2. flex-grow：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

3. flex-shrink：属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

4. flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。（不太明白）

5. flex：flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

6. align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto