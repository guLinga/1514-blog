[创建数组](#1)
  - [[]](#2)
  - [new Array()](#3)
  - [ES6 Array.of()](#4)
  - [ES6 Array.from()](#5)
  - [参考资料](#6)

<p id=1></p>

## 创建数组

<p id=2></p>

### []
```js
let arr = [1,2,3]
```

<p id=3></p>

### new Array()
```js
let arr1 = new Array()//[]
let arr2 = Array()//[]
let arr3 = Array(3)//[,,]
let arr4 = Array(3,4,5)//[3,4,5]
```

<p id=4></p>

### ES6 Array.of()
[Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
```js
Array.of(7); // [7]
Array(7); // array of 7 empty slots
Array.of(1, 2, 3); // [1, 2, 3]
Array(1, 2, 3);    // [1, 2, 3]
```

<p id=5></p>

### ES6 Array.from()
[Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
```js
Array.form('123')//['1','2','3']

const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);// [ "foo", "bar", "baz" ]

const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);// [[1, 2], [2, 4], [4, 8]]
const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());// ['a', 'b'];
Array.from(mapper.keys());// ['1', '2'];

function f() {return Array.from(arguments);}
f(1, 2, 3);// [ 1, 2, 3 ]

Array.from([1, 2, 3], x => x + x);// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);// [0, 1, 2, 3, 4]
```
我们可以使用Array.from给数组去重合并。
```js
function combine(){
  let arr = [].concat.apply([],arguments);
  return Array.from(new Set(arr));
}
combine([1,2,2],[2,3,3])//[1,2,3]
```

<p id=6></p>

### 参考资料
[1][【干货】js 数组详细操作方法及解析合集](https://juejin.cn/post/6844903614918459406)
[2][MDN](https://developer.mozilla.org/en-US/)
