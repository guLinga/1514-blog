[手写bind](#1)
  - [参考文献](#2)


<p id=1></p>

## 手写bind

<p id=2></p>

```js
Function.prototype.bind2 = function (context) {
  context = context || globalThis;
  const argsTemp = [...arguments];
  argsTemp.shift();
  const _symbol = Symbol();
  context[_symbol] = this;
  return function (...args) {
    let result = context[_symbol](...argsTemp, ...args);
    delete context[_symbol];
    return result;
  }
}
```

<p id=2></p>

### 参考文献
[1][高阶组件手写实现篇](https://www.wolai.com/serendipityape/6yn9QDJFn6Cp2UjPM9LDis)
