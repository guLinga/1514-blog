[js拷贝](#1)
  - [浅拷贝、深拷贝](#2)
  - [定义测试对象和测试数组](#3)
  - [Array.concat()](#4)
  - [JSON](#5)
  - [扩展运算符](#6)
  - [Object.assign()](#7)
  - [Array.slice()](#8)
  - [lodash的_.cloneDeep方法](#9)
  - [手写简单的深拷贝](#10)
  - [手写复杂的深拷贝](#11)
  - [参考文献](#12)

<p id=1></p>

## js拷贝

<p id=2></p>

### 浅拷贝、深拷贝
浅拷贝：进行赋值的时候，如果是引用类型，拷贝的地址值。修改旧的数据，新的数据也会跟着改变。
深拷贝：将引用类型完整的拷贝一份出来，在堆内存中开辟新的区域存放新对象。修改旧的数据，新的数据不会跟着改变。

<p id=3></p>

### 定义测试对象和测试数组
```js
let obj = {
  name:'我是可枚举的基本字符串类型',
  [Symbol('nam1')]:'我是可枚举的基本Symbol类型',
  name2:{
    name:'我是可枚举的引用字符串类型中的基本字符串类型'
  }
}
Object.defineProperty(obj,'age',{
  value:'我是不可枚举的字符串基本类型',
  writeable: true,
  enumerable: false,
  configurable: true
})
Object.defineProperty(obj,Symbol('age1'),{
  value:'我是不可枚举的字符串Symbol类型',
  writeable: true,
  enumerable: false,
  configurable: true
})
Object.setPrototypeOf(obj,{
  pro:'我是原型上的基本类型',
  [Symbol('pro1')]:'我是原型上的Symbol类型'
})

let arr = ['1',1,undefined,null,Symbol('1'),{name:'111'}];
```

<p id=4></p>

### Array.concat()
```js
let arr2 = arr.concat([111,222,undefined,null,Symbol('1')]);
let arr3 = arr;
arr[5].name = 'name'
arr[0] = 222
console.log(arr,arr2,arr3);
```
![concat](../image/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/concat.png)
Array.concat只深拷贝第一层。所以说是浅拷贝。

<p id=5></p>

### JSON
```js
let obj2 = JSON.parse(JSON.stringify(obj));
obj2.name2.name = "111"
```
![JSON](../image/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/JSON.png)
JSON是深拷贝，但是有缺点。
缺点：不会对undefined、Symbol、function、对象中的不可枚举属性、对象原型上的属性拷贝。

<p id=6></p>

### 扩展运算符
```js
let obj2 = {...obj};
obj2.name = '111'
obj2.name2.name = '111'
console.log('obj',obj,'obj2',obj2);
```
![扩展运算符](../image/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6.png)
扩展运算符只深拷贝第一层。所以说是浅拷贝。
缺点：不会拷贝对象原型上的参数、不会拷贝对象上的不可枚举参数、只会拷贝对象的第一层参数。所以说是浅拷贝。

<p id=7></p>

### Object.assign()
```js
let obj2 = Object.assign({},obj);
obj2.name = '111';
obj2.name2.name = '111';
console.log('obj',obj,'obj2',obj2);
```
![assign](../image/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/assign.png)
Object.assign()只深拷贝第一层。所以说是浅拷贝。
缺点：不会拷贝对象原型上的参数、不会拷贝对象上的不可枚举参数、只会拷贝对象的第一层参数。

<p id=8></p>

### Array.slice()
```js
let arr2 = arr.slice();
let arr3 = arr;
arr[5].name = 'name'
arr[0] = 222
console.log(arr,arr2,arr3);
```
![slice](../image/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/slice.png)
Array.slice()只深拷贝第一层。所以说是浅拷贝。

<p id=9></p>

### lodash的_.cloneDeep方法

<p id=10></p>

### 手写简单的深拷贝
```js
function deepClone(target, map = new WeakMap()) {
  if (typeof target === 'object'&&target!==null) {
      let cloneTarget = Array.isArray(target) ? [] : new target.constructor();
      if (map.get(target)) {
          return target;
      }
      map.set(target, true);
      if (type === '[object Map]') {
        target.forEach((item, key) => {
          cloneTarget.set(deepClone(key, map), deepClone(item, map))
        })
      }
      if (type === '[object Set]') {
        target.forEach((item) => {
          cloneTarget.add(deepClone(item, map))
        })
      }
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          cloneTarget[key] = deepClone(target[key], map)
        }
      }
      return cloneTarget
  } else {
      return target;
  }
};
```

<p id=11></p>

### 手写复杂的深拷贝
```js
const getType = (obj)=>Object.prototype.toString.call(obj);


const mapTag = '[object Map]'
const setTag = '[object Set]'
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target))
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target))
    case stringTag:
      return new Object(String.prototype.valueOf.call(target))
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target))
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return handleRegExp(target)
    case funcTag:
      return handleFunc(target)
    default:
      return new Ctor(target)
  }
}

const canTraverse = {
  '[object Map]':true,
  '[object Set]':true,
  '[object Array]':true,
  '[object Object]':true,
  '[object Arguments]':true
}

//判断target是否是数组、对象、函数
const isObject = (target)=>target!==null&&(typeof target==='object'||typeof target==='function');


const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (!body) return null
  if (param) {
    const paramArr = param[0].split(',')
    return new Function(...paramArr, body[0])
  } else {
    return new Function(body[0])
  }
}

//深拷贝
function deepClone(target,map = new WeakMap()){
  if(!isObject(target))return target;
  let type = getType(target);
  let cloneTarget = null;
  if(!canTraverse[type]){
    //不可遍历的类型
    return handleNotTraverse(target,type);
  }else{
    //可遍历的类型
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }

  if (map.get(target)) return map.get(target);
  map.set(target, cloneTarget)

  if(type === mapTag){
    //处理Map
    target.forEach((item,key) => {
      cloneTarget.set(deepClone(key,map),deepClone(item,map));
    });
  }

  if(type === setTag){
    //处理Set
    target.forEach((item,key) => {
      cloneTarget.add(deepClone(item,map));
    });
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map)
    }
  }

  return cloneTarget;
}
```

<p id=12></p>

### 参考文献
[1][lodash](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

[2][如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

[3][深拷贝](https://www.zhangbaolin.cn/docs/js/%E6%89%8B%E5%86%99/%E6%B7%B1%E6%8B%B7%E8%B4%9D/)