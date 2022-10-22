## 手写new

```js
function create(){
  let obj = {};
  let Con = [].shift.call(arguments);
  console.log([].shift);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj,arguments);
  return result instanceof Object ? result : obj;
}
```