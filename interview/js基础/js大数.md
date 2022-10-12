## js大数

### 大数定义
```js
const big1 = 9007199254740991n;
const big2 = BigInt(9007199254740991);
```
我们可以使用BigInt函数来定义大数，也可以使用数字后面加n的形式来定义大数。

### 大数注意点
大数和number类型相似，但是不能用`Math对象`中的方法，大数不支持`>>>`运算，大数和number类型不能混合运算，大数在转换成number类型是精度会缺失。
```js
const rounded = 5n / 2n;
console.log(rounded);//2n
```

### 大数的比较
大数于number比较，是宽松比较
```js
console.log(0n==0);//true
console.log(0n===0);//false
console.log(1n > 2);//false
console.log(2n>1);//true
console.log(2n>=2);//true
```

对于被Object包裹的大数，要使用对象的比较方式，只有是同一个对象才相等。
```js
console.log(0n === Object(0n));//false
console.log(Object(0n) === Object(0n));//false
console.log(Object(0n) == Object(0n));//false
```
但是又有一个例外
```js
console.log(0n == Object(0n));//true
```

### JSON中的大数
对于大数使用JSON.stringify会报错，因为大数在JSON中不会序列化。如果非要使用JSON.stringify可以使用toJSON函数。
```js
BigInt.prototype.toJSON = function() { return this.toString(); }

console.log(JSON.stringify(BigInt(1)));//JSON.stringify 现在生成如下字符串，而不是抛出异常
```
