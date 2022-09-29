[手写apply](#1)
  - [方法一：ES6](#2)
  - [方法二：ES5](#3)
  - [参考文献](#4)

<p id=1></p>

## 手写apply

<p id=2></p>

### 方法一：ES6
```js
Function.prototype.apply2 = function (context, arr) {
  context = context || globalThis;
  const _symbol = Symbol();
  context[_symbol] = this;
  let result = context[_symbol](...arr);
  delete context[_symbol];
  return result;
}
```

<p id=3></p>

### 方法二：ES5
```js
Function.prototype.apply3 = function (context, arr) {
  context = context || globalThis;
  context.fn = this;
  let result;
  if (!arr) {
    retult = context.fn();
  } else {
    let args = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
}
```

<p id=4></p>

### 参考文献
[1][如何模拟实现call、apply函数](https://www.zhangbaolin.cn/docs/js/%E6%89%8B%E5%86%99/%E5%A6%82%E4%BD%95%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E5%87%BD%E6%95%B0)