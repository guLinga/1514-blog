## 遍历数组

### forEach
```js
let arr = [1,2,3];
arr.forEach((item,index,arr)=>{
  console.log(item,index,arr);
},globalThis);
```
item:数组中的每一个元素，必选
index:元素对应的下标，可选
arr:原数组，可选
globalThis:forEach中的this指向，不填默认undefined

**forEach在遍历的过程中只能使用try…catch中断。**

### every
every()方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
```js
let arr = [1,2,3];
arr.every((item,index,arr)=>{
  console.log(item,index,arr);
  return true;
},globalThis);
```
every()需要返回一个true，如果没有返回值，只会遍历第一个。

### some
some()方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
```js
let arr = [1,2,3];
arr.some((item,index,arr)=>{
  console.log(item,index,arr);
  return false;
},globalThis);
```
some()需要返回一个false，如果没有返回值，只会遍历第一个。

### filter
filter() 方法创建给定数组一部分的浅拷贝 (en-US)，其包含通过所提供函数实现的测试的所有元素。
```js
let arr = [1,2,3];
let result = arr.filter((item,index,arr)=>{
  console.log(item,index,arr);
},globalThis);
console.log(result);//[]
```

### map
map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
```js
let arr = [1,2,3];
let result = arr.map((item,index,arr)=>{
  console.log(item,index,arr);
  return item;
},globalThis);
console.log(result);//[ 1, 2, 3 ]
```

### reduce

```js
let arr = [1,2,3];
let init = 1;
let result = arr.reduce((x,y)=>{
  return x+y;
},init)
console.log(result);//7
```
init:初始化值

### reduceRight
reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
```js
const array1 = [[0, 1], [2, 3], [4, 5]];
const init = [6]
const result = array1.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue),init);
console.log(result);//[6, 4, 5, 2, 3, 0, 1]
```
init:首次调用 callback 函数时，累加器 accumulator 的值。如果未提供该初始值，则将使用数组中的最后一个元素，并跳过该元素。如果不给出初始值，则需保证数组不为空。 否则，在空数组上调用 reduce 或 reduceRight 且未提供初始值（例如 [].reduce( (acc, cur, idx, arr) => {} ) ）的话，会导致类型错误。
```js
let arr2 = [];
arr2.reduceRight((x,y,index,arr)=>{})//报错
```

### ES6 find()&findIndex()
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
```js
let result = arr.find((item)=>{
  console.log(item);
  return item<0;
})
console.log(result);//undefined
```
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
```js
let result = arr.findIndex(item=>{
  return item<0;
})
console.log(result);//-1
```

### keys()&values()&entries()
```js
let arr = [1,2,3];
console.log(Object.keys(arr));//[ '0', '1', '2' ]
console.log(Object.values(arr));//[ 1, 2, 3 ]
console.log(Object.entries(arr));//[ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

### 参考资料
[1][【干货】js 数组详细操作方法及解析合集](https://juejin.cn/post/6844903614918459406)
[2][MDN](https://developer.mozilla.org/en-US/)