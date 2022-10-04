[React render阶段](#1)
  - [流程](#2)
    + [递阶段](#3)
    + [归阶段](#4)
  - [参考资料](#5)

<p id=1></p>

## React render阶段

<p id=2></p>

### 流程

<p id=3></p>

#### 递阶段
首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个`Fiber`节点调用`beginWork`方法。该方法会根据传入的`Fiber`节点创建子`Fiber`节点，并将这两个`Fiber`节点连接起来。当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

<p id=4></p>

#### 归阶段
在“归”阶段会调用`completeWork`处理`Fiber`节点。当某个Fiber节点执行完`completeWork`，如果其存在兄弟Fiber节点（即`fiber.sibling !== null`），会进入其兄弟`Fiber`的“递”阶段。如果不存在兄弟`Fiber`，会进入父级`Fiber`的“归”阶段。“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render`阶段的工作就结束了。

<p id=5></p>

### 参考资料
[1][React技术揭秘](https://react.iamkasong.com/)