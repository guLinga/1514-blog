## setState

### setState是同步还是异步？

1. setState只在合成事件和钩子中是异步的，在原生事件和setTimeout中都是同步的。